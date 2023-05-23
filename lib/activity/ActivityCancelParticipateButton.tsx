"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { unparticipateInActivity } from "./actions";
import { useRouter } from "next/navigation";

interface ActivityCancelParticipateButtonProps {
  activityId: number;
}

function ActivityCancelParticipateButton({
  activityId,
}: ActivityCancelParticipateButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <Button
      size="xs"
      variant="destructive"
      className="block w-full"
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(async () => {
          await unparticipateInActivity({ activityId });
          router.refresh();
        });
      }}
    >
      Cancel plans
    </Button>
  );
}

export default ActivityCancelParticipateButton;
