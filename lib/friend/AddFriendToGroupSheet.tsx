import FriendListItem from "./FriendListItem";
import { GroupFriend, GroupFriendGroup } from "../group/GroupCard";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import FriendsBulkListItem from "./FriendsBulkListItem";
import { useState, useTransition } from "react";
import { addGroupMembers } from "../group/actions";

interface AddFriendToGroupSheetProps {
  groupId: number;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function AddFriendToGroupSheet({
  friends,
  groupId,
  friendGroups,
}: AddFriendToGroupSheetProps) {
  const [isPending, startTransition] = useTransition();

  const friendsInGroup: typeof friends = [];
  const friendsNotInGroup: typeof friends = [];

  const [chosenFriends, setChosenFriends] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

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
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="relative text-muted-foreground">
        <SheetTrigger asChild className="block w-full">
          <Button variant="outline">Add member to group</Button>
        </SheetTrigger>
      </div>
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
          <SheetFooter>
            <Button
              type="button"
              onClick={() => {
                startTransition(async () => {
                  await addGroupMembers({
                    groupId: groupId,
                    members: chosenFriends,
                  });
                  setOpen(false);
                });
              }}
            >
              Add
            </Button>
          </SheetFooter>
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
      </SheetContent>
    </Sheet>
  );
}

export default AddFriendToGroupSheet;
