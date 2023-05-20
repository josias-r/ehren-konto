"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { participateInActivity } from "./actions";
import { useRouter } from "next/navigation";

interface ActivityParticipateButtonProps {
  activityId: number;
}

function ActivityParticipateButton({
  activityId,
}: ActivityParticipateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      size="xs"
      className="block w-full"
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(async () => {
          await participateInActivity({ activityId });
          router.refresh();
        });
      }}
    >
      Participate
    </Button>
  );
}

export default ActivityParticipateButton;
