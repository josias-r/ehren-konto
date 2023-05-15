import { GroupFriend, GroupFriendGroup } from "../group/GroupCard";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import FriendsBulkListItem from "./FriendsBulkListItem";
import { useState, useTransition } from "react";
import { addGroupMembers } from "../group/actions";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";

interface AddFriendToGroupSheetProps {
  groupId: number;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];

  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddFriendToGroupSheet({
  friends,
  groupId,
  friendGroups,

  open,
  onOpenChange,
}: AddFriendToGroupSheetProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const friendsInGroup: typeof friends = [];
  const friendsNotInGroup: typeof friends = [];

  const [chosenFriends, setChosenFriends] = useState<string[]>([]);

  if (groupId !== null) {
    friends.forEach((friend) => {
      if (friend.groups.some((group) => group.groupId === groupId)) {
        friendsInGroup.push(friend);
      } else {
        friendsNotInGroup.push(friend);
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Add members to group</SheetTitle>
            <SheetDescription>
              {!!friendsInGroup.length && (
                <>{friendsInGroup.length} friends are already in this group</>
              )}
              {!friendsInGroup.length && (
                <>None of your friends are in this group yet</>
              )}
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          !!friendsNotInGroup.length && (
            <SheetFooter>
              <Button
                type="button"
                onClick={() => {
                  startTransition(async () => {
                    await addGroupMembers({
                      groupId: groupId,
                      members: chosenFriends,
                    });
                    onOpenChange(false);
                  });
                }}
              >
                Add
              </Button>
            </SheetFooter>
          )
        }
      >
        <div className="grid gap-6">
          {friendsNotInGroup.map((friend) => (
            <FriendsBulkListItem
              key={friend.userId}
              friend={friend}
              onChosenFriendsChange={(newChosenFriends) => {
                setChosenFriends(newChosenFriends);
              }}
              chosenFriends={chosenFriends}
              friendGroups={friendGroups}
            />
          ))}
        </div>
        {!friendsNotInGroup.length && (
          <EmptyState
            title="No additonal friends"
            message={
              <>
                You can add more friends on the{" "}
                <Button
                  className="inline p-0"
                  variant="link"
                  onClick={() => {
                    router.push("/friends");
                  }}
                >
                  friends
                </Button>{" "}
                page
              </>
            }
            className="pt-12"
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default AddFriendToGroupSheet;
