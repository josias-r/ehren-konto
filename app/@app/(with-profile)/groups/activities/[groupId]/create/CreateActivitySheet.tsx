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
import { Button } from "@/components/ui/button";
import CreateActivityForm from "./CreateActivityForm";
import { useRouter } from "next/navigation";

interface CreateActivitySheetProps {
  groupName: string;
  groupId: number;
}

function CreateActivitySheet({ groupName, groupId }: CreateActivitySheetProps) {
  const formId = "create-activity";

  const router = useRouter();

  return (
    <Sheet open onOpenChange={() => router.back()}>
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
            router.back();
            router.refresh();
          }}
          groupId={groupId}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateActivitySheet;
