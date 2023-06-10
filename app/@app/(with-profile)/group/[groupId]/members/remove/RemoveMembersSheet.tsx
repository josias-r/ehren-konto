"use client";

import { GroupMembers } from "@/app/@app/(with-profile)/group/[groupId]/members/getGroupWithMembers";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import MembersBulkListItem from "@/app/@app/(with-profile)/group/[groupId]/members/remove/MembersBulkListItem";
import { removeGroupMembers } from "@/app/@app/(with-profile)/groups/actions";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface RemoveMembersSheetProps {
  groupId: number;
  groupMembers: NonNullable<GroupMembers>;
}

function RemoveMembersSheet({
  groupMembers,
  groupId,
}: RemoveMembersSheetProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [chosenMembers, setChosenMembers] = useState<string[]>([]);

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Remove members from group</SheetTitle>
            <SheetDescription>
              Choose the members to remove from the group.
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button
              type="button"
              disabled={isPending}
              onClick={() => {
                startTransition(async () => {
                  await removeGroupMembers({
                    groupId: groupId,
                    members: chosenMembers,
                  });
                  router.back();
                  router.refresh();
                });
              }}
            >
              Remove
            </Button>
          </SheetFooter>
        }
      >
        <div className="grid gap-6">
          <div className="grid gap-6">
            {groupMembers.map((member) => (
              <MembersBulkListItem
                key={member.userId}
                member={member}
                onChosenMembersChange={(newChosenMembers) => {
                  setChosenMembers(newChosenMembers);
                }}
                chosenMembers={chosenMembers}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default RemoveMembersSheet;
