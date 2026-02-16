// import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { auth } from "@clerk/nextjs/server";
import { generateText } from "ai";
import { NextResponse } from "next/server";
// import { z } from "zod";

// const suggestionSchema = z.object({
//   suggestion: z
//     .string()
//     .describe(
//       "The code to insert at cursor, or empty string if no completion needed",
//     ),
// });

const SUGGESTION_PROMPT = `
You are an inline code completion engine similar to GitHub Copilot.

Your task is to generate ONLY the minimal continuation of code at the cursor position.

<context>
File: {fileName}

Previous lines:
{previousLines}

Current line ({lineNumber}):
{currentLine}

Text before cursor:
{textBeforeCursor}

Text after cursor:
{textAfterCursor}

Next lines:
{nextLines}

Full file:
{code}
</context>

Rules (STRICT):
- Output ONLY the exact code to insert at the cursor.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT wrap in backticks.
- Do NOT repeat any text that already exists in textAfterCursor.
- Do NOT repeat any text already present in next lines.
- If the code is already complete, return an empty string.
- Prefer short, minimal completions.
- If completing a partially typed token, return only the remaining characters.
- Never rewrite the entire line.

If no completion is required, return an empty string.
`;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    const {
      fileName,
      code,
      currentLine,
      previousLines,
      textBeforeCursor,
      textAfterCursor,
      nextLines,
      lineNumber,
    } = await request.json();
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }
    const prompt = SUGGESTION_PROMPT.replace("{fileName}", fileName)
      .replace("{code}", code)
      .replace("{currentLine}", currentLine)
      .replace("{previousLines}", previousLines || "")
      .replace("{textBeforeCursor}", textBeforeCursor)
      .replace("{textAfterCursor}", textAfterCursor)
      .replace("{nextLines}", nextLines || "")
      .replace("{lineNumber}", lineNumber.toString());

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
    });
    let suggestion = text.trim();

    // Remove markdown fences if model ignores rules
    suggestion = suggestion.replace(/```/g, "").trim();

    // Remove suggestions that already exist after cursor
    if (
      textAfterCursor &&
      suggestion &&
      textAfterCursor.startsWith(suggestion)
    ) {
      suggestion = "";
    }

    // Optional: prevent multiline explosions
    if (suggestion.includes("\n")) {
      suggestion = suggestion.split("\n")[0];
    }

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Suggestion error: ", error);
    return NextResponse.json(
      { error: "Failed to generate suggestion" },
      { status: 500 },
    );
  }
}
