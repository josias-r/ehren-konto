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
import CreateGroupForm from "./CreateGroupForm";
import { useRouter } from "next/navigation";
import { UserFriends } from "../../friends/getAllFriendsForUser";

interface CreateGroupSheetProps {
  userFriends: UserFriends;
}

function CreateGroupSheet({ userFriends }: CreateGroupSheetProps) {
  const formId = "create-group";

  const router = useRouter();

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Create group</SheetTitle>
            <SheetDescription>
              Create a group and add members to it
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button type="submit" form={formId}>
              Create group
            </Button>
          </SheetFooter>
        }
      >
        <CreateGroupForm
          formId={formId}
          userFriends={userFriends}
          onDone={() => {
            router.back();
            router.refresh();
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateGroupSheet;
