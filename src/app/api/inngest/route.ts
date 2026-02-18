import { inngest } from "@/inngest/client";
import { demoGenerate } from "@/inngest/functions";
import { processMessage } from "@/components/features/conversations/inngest/process-message";
import { serve } from "inngest/next";
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [demoGenerate, processMessage],
});
