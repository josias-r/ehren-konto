"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "lucide-react";
import { useTransition } from "react";
import { updateInviteLink } from "./actions";
import { useToast } from "@/components/ui/use-toast";

function CopyInviteLinkDropdownItem() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const linkId = await updateInviteLink();
          const link = `${window.location.origin}/invite/${linkId}`;
          await navigator.clipboard.writeText(link);
          toast({
            description: "Copied invite link",
          });
        });
      }}
    >
      <Link className="w-4 h-4 mr-2" />
      <span>Copy invite link</span>
    </DropdownMenuItem>
  );
}

export default CopyInviteLinkDropdownItem;
