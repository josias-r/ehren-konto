"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { participateInActivity } from "./actions";

interface ActivityParticipateButtonProps {
  activityId: number;
}

function ActivityParticipateButton({
  activityId,
}: ActivityParticipateButtonProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      size="xs"
      className="block w-full"
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(async () => {
          await participateInActivity({ activityId });
        });
      }}
    >
      Participate
    </Button>
  );
}

export default ActivityParticipateButton;
