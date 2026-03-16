import { inngest } from "@/inngest/client";
import { processMessage } from "@/components/features/conversations/inngest/process-message";
import { serve } from "inngest/next";
import { importGithubRepo } from "@/components/features/projects/inngest/import-github-repo";
import { exportToGithub } from "@/components/features/projects/inngest/export-to-github";
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ processMessage,importGithubRepo,exportToGithub],
});
