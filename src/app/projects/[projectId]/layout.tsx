import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import ProjectIdLayout from "@/components/features/projects/components/project-id-layout";

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: Id<"projects"> }>;
}) => {
  const { projectId } = await params;
  return <ProjectIdLayout projectId={projectId}>{children}</ProjectIdLayout>;
};

export default layout;
