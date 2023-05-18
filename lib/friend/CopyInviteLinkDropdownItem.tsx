"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "lucide-react";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { copyTextToClipboard } from "../utils";
import { ToastAction } from "@/components/ui/toast";
import { updateInviteLink } from "../user/actions";

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

          const success = await copyTextToClipboard(link);
          toast({
            title: success
              ? "Copied invite link"
              : "Failed to copy invite link",
            description: success ? (
              <>
                This link will expire in 24 hours. Click the icon to copy it
                again.
              </>
            ) : (
              "Failed to copy the invite link to your clipboard. Click the icon to try again."
            ),
            variant: !success ? "destructive" : undefined,
            action: (
              <ToastAction
                altText="Copy again"
                onClick={async () => {
                  const success = await copyTextToClipboard(link);
                  if (!success) {
                    alert(
                      "Cannot copy invite link, please try again later or try with a different browser."
                    );
                  }
                }}
              >
                <Link className="w-4 h-4" />
              </ToastAction>
            ),
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
