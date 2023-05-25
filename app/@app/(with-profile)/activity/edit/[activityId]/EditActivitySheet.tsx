"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditActivityForm, { ActivityEditFormShape } from "./EditActivityForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { updateActivity } from "@/lib/activity/actions";
import { useLoadingToast } from "@/components/ui/use-loading-toast";

interface EditActivitySheetProps {
  defaultValues: ActivityEditFormShape;
  activityId: number;
}

function EditActivitySheet({
  defaultValues,
  activityId,
}: EditActivitySheetProps) {
  const formId = "create-activity";

  const router = useRouter();

  const { loadingToast, errorToast } = useLoadingToast();

  const [isPending, startTransition] = useTransition();

  return (
    <Sheet
      open={!isPending} // close immediately while pending, will close also because of router.back() once done
      onOpenChange={() => {
        router.back();
      }}
    >
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Edit group activity</SheetTitle>
            <SheetDescription>
              Edit details of &quot;{defaultValues.name}&quot;
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button form={formId} type="submit">
              Edit activity
            </Button>
          </SheetFooter>
        }
      >
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
          activityId={activityId}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditActivitySheet;
