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
import { GroupFriend, GroupFriendGroup } from "./GroupCard";
import { Button } from "@/components/ui/button";
import CreateGroupForm from "./CreateGroupForm";

interface CreateGroupSheetProps {
  children: ReactNode;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function CreateGroupSheet({
  friends,
  friendGroups,
  children,
}: CreateGroupSheetProps) {
  const formId = "create-group";

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
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
          friends={friends}
          friendGroups={friendGroups}
          onDone={() => {
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateGroupSheet;
