"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import EditActivityForm, { ActivityEditFormShape } from "./EditActivityForm";

interface EditActivitySheetProps {
  defaultValues: ActivityEditFormShape;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityId: number;
}

function EditActivitySheet({
  open,
  onOpenChange,
  defaultValues,
  activityId,
}: EditActivitySheetProps) {
  const formId = "create-activity";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
            onOpenChange(false);
          }}
          activityId={activityId}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditActivitySheet;
