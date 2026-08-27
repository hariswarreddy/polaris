import { generateText } from "ai";
import { inngest } from "./client";
import { createOpenAI } from "@ai-sdk/openai";
import { firecrawl } from "@/firecrawl";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate", triggers: [{ event: "demo/generate" }] },
  async ({ event, step }) => {
    const { prompt } = event.data as { prompt: string };
    const urls = (await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) ?? [];
    })) as string[];

    const scrapedContent = await step.run("scrape-urls", async () => {
      const results = await Promise.all(
        urls.map(async (url) => {
          const result = await firecrawl.scrape(url, {
            formats: ["markdown"],
          });
          return result.markdown ?? null;
        }),
      );
      return results.filter(Boolean).join("\n\n");
    });

    const finalPrompt = scrapedContent
      ? `Context:\n${scrapedContent} \n\n Question:${prompt}`
      : prompt;
    await step.run("generate-text", async () => {
      return await generateText({
        model: openrouter("z-ai/glm-5.3-flash"),
        prompt: finalPrompt,
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
      });
    });
  },
);
