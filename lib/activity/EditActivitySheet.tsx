import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import EditActivityForm, { ActivityEditFormShape } from "./EditActivityForm";
import { ReactNode } from "react";

interface EditActivitySheetProps {
  defaultValues: ActivityEditFormShape;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function EditActivitySheet({
  open,
  onOpenChange,
  defaultValues,
}: EditActivitySheetProps) {
  const formId = "create-activity";
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Edit group activity</SheetTitle>
            <SheetDescription>Edit details of this activity</SheetDescription>
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
        <EditActivityForm formId={formId} defaultValues={defaultValues} />
      </SheetContent>
    </Sheet>
  );
}

export default EditActivitySheet;
