import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
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

  return (
    <Sheet>
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
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditGroupSheet;
