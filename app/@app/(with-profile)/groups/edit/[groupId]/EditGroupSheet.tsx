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
import { useRouter } from "next/navigation";

interface EditGroupSheetProps {
  groupId: number;
  defaultValues: GroupEditFormShape;
}

function EditGroupSheet({ groupId, defaultValues }: EditGroupSheetProps) {
  const formId = "edit-group";

  const router = useRouter();

  return (
    <Sheet open onOpenChange={() => router.back()}>
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
          onDone={() => router.back()}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditGroupSheet;
