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
import EditGroupForm, { GroupEditFormShape } from "./EditGroupForm";

interface EditGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: number;
  defaultValues: GroupEditFormShape;
}

function EditGroupSheet({
  groupId,
  defaultValues,
  open,
  onOpenChange,
}: EditGroupSheetProps) {
  const formId = "edit-group";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Edit group</SheetTitle>
            <SheetDescription>Edit group details</SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button type="submit" form={formId}>
              Edit group
            </Button>
          </SheetFooter>
        }
      >
        <EditGroupForm
          formId={formId}
          groupId={groupId}
          defaultValues={defaultValues}
          onDone={() => {
            onOpenChange(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditGroupSheet;
