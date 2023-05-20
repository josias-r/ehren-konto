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

  return (
    <Sheet
      open
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
          onDone={() => {
            router.back();
            router.refresh();
          }}
          activityId={activityId}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditActivitySheet;
