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
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { updateActivity } from "@/lib/activity/actions";
import { Loader2 } from "lucide-react";

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

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  return (
    <Sheet
      open={!isPending}
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
            const { dismiss } = toast({
              variant: "secondary",
              duration: 1000000,

              description: (
                <div className="flex items-center">
                  <Loader2
                    className="animate-spin pointer-events-none m-0 mr-2"
                    size="1rem"
                  />{" "}
                  Saving
                </div>
              ),
            });
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

                dismiss();
                router.back();
                router.refresh();
              } catch (error) {
                toast({
                  title: "Error editing activity",
                  description: "Sorry, we couldn't edit your activity.",
                  variant: "destructive",
                });
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
