"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { befriendUser } from "./actions";

interface BefriendUserProps {
  inviteLink: string;
}

function BefriendUser({ inviteLink }: BefriendUserProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await befriendUser({
            inviteLink,
          });
        });
      }}
    >
      Accept invite
    </Button>
  );
}

export default BefriendUser;
