"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import EditGroupForm, { GroupEditFormShape } from "./EditGroupForm";

interface EditGroupSheetProps {
  children: ReactNode;
  groupId: number;
  defaultValues: GroupEditFormShape;
}

function EditGroupSheet({
  children,
  groupId,
  defaultValues,
}: EditGroupSheetProps) {
  const formId = "edit-group";

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
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
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditGroupSheet;
