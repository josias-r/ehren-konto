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
import CreateActivityForm from "./CreateActivityForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { createActivity } from "@/lib/activity/actions";

interface CreateActivityCardProps {
  groupName: string;
  groupId: number;
}

function CreateActivityCard({ groupName, groupId }: CreateActivityCardProps) {
  const formId = "create-activity";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToast, errorToast } = useLoadingToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new group activity</CardTitle>
        <CardDescription>{groupName}</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateActivityForm
          formId={formId}
          onSubmit={(data) => {
            startTransition(async () => {
              const { dismissLoadingToast } = loadingToast("Creating activity");
              try {
                if (!data.from) {
                  throw new Error("No from date");
                }
                const fullFromDate = new Date(data.from);
                const [hours, minutes] = data.fromTime.split(":");
                fullFromDate.setHours(parseInt(hours));
                fullFromDate.setMinutes(parseInt(minutes));

                await createActivity({
                  name: data.name,
                  emoji: data.emoji,
                  color: data.color,
                  from: fullFromDate,
                  groupId,
                });

                dismissLoadingToast();
                router.back();
                router.refresh();
              } catch (e) {
                dismissLoadingToast();
                errorToast("Failed to create activity");
              }
            });
          }}
        />
      </CardContent>
      <CardFooter>
        <Button form={formId} type="submit">
          Create activity
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreateActivityCard;
