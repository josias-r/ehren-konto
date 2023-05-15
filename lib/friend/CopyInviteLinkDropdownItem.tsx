"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "lucide-react";
import { useTransition } from "react";
import { updateInviteLink } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { copyTextToClipboard } from "../utils";

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

          await copyTextToClipboard(link);
          toast({
            title: "Copied invite link",
            description:
              "The invite link has been copied to your clipboard. It will expire in 24 hours.",
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
