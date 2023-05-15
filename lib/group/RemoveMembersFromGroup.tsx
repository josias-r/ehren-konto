import {} from "./GroupCard";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import MembersBulkListItem from "./MembersBulkListItem";
import { useState, useTransition } from "react";
import { removeGroupMembers } from "./actions";
import { MemberShape } from "./GroupMemberListItem";

interface RemoveMembersFromGroupProps {
  groupId: number;
  members: MemberShape[];

  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RemoveMembersFromGroup({
  members,
  groupId,

  open,
  onOpenChange,
}: RemoveMembersFromGroupProps) {
  const [isPending, startTransition] = useTransition();

  const [chosenMembers, setChosenMembers] = useState<string[]>([]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
              onClick={() => {
                startTransition(async () => {
                  await removeGroupMembers({
                    groupId: groupId,
                    members: chosenMembers,
                  });
                  onOpenChange(false);
                });
              }}
            >
              Remove
            </Button>
          </SheetFooter>
        }
      >
        <div className="grid gap-6">
          {members.map((member) => (
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
      </SheetContent>
    </Sheet>
  );
}

export default RemoveMembersFromGroup;
