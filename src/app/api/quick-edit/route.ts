import { firecrawl } from "@/firecrawl";
// import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});
import { generateText } from "ai";
import { NextResponse } from "next/server";
// import z from "zod";

// const quickEditSchema = z.object({
//   editedCode: z
//     .string()
//     .describe(
//       "The edited version of the selected code based on the instruction",
//     ),
// });

const URL_REGEX = /https?:\/\/[^\s)>\]]+/g;

const QUICK_EDIT_PROMPT = `
You are a targeted code editing engine.

Your task is to modify ONLY the selected code according to the instruction.

<context>
Selected code:
{selectedCode}

Full file context:
{fullCode}
</context>

{documentation}

Instruction:
{instruction}

Rules (STRICT):
- Return ONLY the modified version of the selected code.
- Do NOT return the entire file.
- Do NOT include explanations.
- Do NOT include markdown.
- Do NOT wrap in backticks.
- Maintain original indentation and formatting style.
- Preserve surrounding structure.
- If no valid edit can be applied, return the selected code unchanged.
`;

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const { selectedCode, fullCode, instruction } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!selectedCode) {
      return NextResponse.json(
        { error: "Selected code is required" },
        { status: 400 },
      );
    }

    if (!instruction) {
      return NextResponse.json(
        { error: "Instruction is required" },
        { status: 400 },
      );
    }
    const urls: string[] = instruction.match(URL_REGEX) || [];
    let documentationContext = "";

    if (urls.length > 0) {
      const scrappedResults = await Promise.all(
        urls.map(async (url) => {
          try {
            const result = await firecrawl.scrape(url, {
              formats: ["markdown"],
            });
            if (result.markdown) {
              return `<doc url="${url}">\n${result.markdown}\n</doc>`;
            }

            return null;
          } catch (error) {
            console.log(error);
            return null;
          }
        }),
      );
      const validResults = scrappedResults.filter(Boolean);
      if (validResults.length > 0) {
        documentationContext = `<documentation>\n${validResults.join("\n\n")}\n</documentation>`;
      }
    }
    const prompt = QUICK_EDIT_PROMPT.replace("{selectedCode}", selectedCode)
      .replace("{fullCode}", fullCode || "")
      .replace("{instruction}", instruction)
      .replace("{documentation}", documentationContext);

    const { text } = await generateText({
      model: openrouter("openrouter/free"),
      prompt,
    });

    return NextResponse.json({ editedCode:text });
  } catch (error) {
    console.error("Edit error:", error);
    return NextResponse.json(
      { error: "Failed to generate edit" },
      { status: 500 },
    );
  }
}
