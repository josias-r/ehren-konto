"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { befriendUser } from "../../@app/(with-profile)/friends/actions";
import { useRouter } from "next/navigation";

interface BefriendUserProps {
  inviteLink: string;
}

function BefriendUser({ inviteLink }: BefriendUserProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await befriendUser({
            inviteLink,
          });
          router.push("/friends");
        });
      }}
    >
      Accept invite
    </Button>
  );
}

export default BefriendUser;
