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
import CreateActivityForm from "./CreateActivityForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { createActivity } from "@/lib/activity/actions";

interface CreateActivitySheetProps {
  groupName: string;
  groupId: number;
}

function CreateActivitySheet({ groupName, groupId }: CreateActivitySheetProps) {
  const formId = "create-activity";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToast, errorToast } = useLoadingToast();

  return (
    <Sheet
      open={!isPending} // close immediately while pending, will close also because of router.back() once done
      onOpenChange={() => router.back()}
    >
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Create new group activity</SheetTitle>
            <SheetDescription>{groupName}</SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button form={formId} type="submit">
              Create activity
            </Button>
          </SheetFooter>
        }
      >
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
      </SheetContent>
    </Sheet>
  );
}

export default CreateActivitySheet;
