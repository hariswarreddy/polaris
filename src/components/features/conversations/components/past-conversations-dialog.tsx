"use client";

import {
  CommandDialog,
  CommandInput,
  CommandEmpty,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useConversations } from "../hooks/use-conversations";
import { formatDistanceToNow } from "date-fns";

interface PastConversationsDialogProps {
  projectId: Id<"projects">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (conversationId: Id<"conversations">) => void;
}

export const PastConversationsDialog = ({
  projectId,
  open,
  onOpenChange,
  onSelect,
}: PastConversationsDialogProps) => {
  const conversations = useConversations(projectId);

  const handleSelect = (conversationId: Id<"conversations">) => {
    onSelect(conversationId);
    onOpenChange(false);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Past Conversations"
      description="Search and select a past conversation"
    >
      <CommandInput placeholder="Search conversations..." />
      <CommandEmpty>No Conversations Found</CommandEmpty>
      <CommandList>
        {conversations?.map((conversation) => (
          <CommandItem
            key={conversation._id}
            value={`${conversation.title}-${conversation._id}`}
            onSelect={() => handleSelect(conversation._id)}
          >
            <div className="flex flex-col gap-0.5">
              <span>{conversation.title}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(conversation._creationTime, {
                  addSuffix: true,
                })}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </CommandDialog>
  );
};
