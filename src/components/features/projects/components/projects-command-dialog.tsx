"use client";

import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useProjects } from "../../hooks/use-projects";
import { getProjectIcon } from "./projects-list";

interface ProjectsCommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectsCommandDialog = ({
  open,
  onOpenChange,
}: ProjectsCommandDialogProps) => {
  const router = useRouter();
  const projects = useProjects();
  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
    onOpenChange(false);
  };
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigate to your projects"
      className=""
    >
      <CommandInput placeholder="Search projects..." />
      <CommandList>
        <CommandEmpty>No Projects Found.</CommandEmpty>
        {projects?.map((project) => (
          <CommandItem
            key={project._id}
            value={`${project.name}-${project._id}`}
            onSelect={() => handleSelect(project._id)}
            className=""
          >
            {getProjectIcon(project)}
            <span>{project.name}</span>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
};

export default ProjectsCommandDialog;
