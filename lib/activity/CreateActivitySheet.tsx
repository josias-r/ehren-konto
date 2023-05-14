"use client";

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
import CreateActivityForm from "./CreateActivityForm";
import { useState } from "react";

interface CreateActivitySheetProps {
  groupName: string;
  groupId: number;
}

function CreateActivitySheet({ groupName, groupId }: CreateActivitySheetProps) {
  const formId = "create-activity";

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Create new group activity</Button>
      </SheetTrigger>
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
          onDone={() => {
            setOpen(false);
          }}
          groupId={groupId}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateActivitySheet;
