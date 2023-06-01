"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditActivityForm, { ActivityEditFormShape } from "./EditActivityForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateActivity } from "@/lib/activity/actions";
import { useLoadingToast } from "@/components/ui/use-loading-toast";

interface EditActivityCardProps {
  defaultValues: ActivityEditFormShape;
  activityId: number;
}

function EditActivityCard({
  defaultValues,
  activityId,
}: EditActivityCardProps) {
  const formId = "create-activity";

  const router = useRouter();

  const { loadingToast, errorToast } = useLoadingToast();

  const [isPending, startTransition] = useTransition();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit group activity</CardTitle>
        <CardDescription>
          Edit details of &quot;{defaultValues.name}&quot;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditActivityForm
          formId={formId}
          defaultValues={defaultValues}
          onSubmit={(data) => {
            const { dismissLoadingToast } = loadingToast("Saving");
            startTransition(async () => {
              try {
                if (!data.from) {
                  throw new Error("No from date");
                }

                const fullFromDate = new Date(data.from);
                const [hours, minutes] = data.fromTime.split(":");
                fullFromDate.setHours(parseInt(hours));
                fullFromDate.setMinutes(parseInt(minutes));

                await updateActivity({
                  activityId,
                  name: data.name,
                  emoji: data.emoji,
                  color: data.color,
                  from: fullFromDate,
                });

                dismissLoadingToast();
                router.back();
                router.refresh();
              } catch (error) {
                errorToast("Sorry, we couldn't edit your activity.");
              }
            });
          }}
        />
      </CardContent>
      <CardFooter>
        <Button form={formId} type="submit">
          Edit activity
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditActivityCard;
