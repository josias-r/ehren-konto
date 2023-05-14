import FriendListItem from "./FriendListItem";
import { GroupFriend, GroupFriendGroup } from "../group/GroupCard";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

interface AddFriendToGroupSheetProps {
  /** null indicates the modal is used for a create group modal */
  groupId: number | null;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function AddFriendToGroupSheet({
  friends,
  groupId,
  friendGroups,
}: AddFriendToGroupSheetProps) {
  const friendsInGroup: typeof friends = [];
  const friendsNotInGroup: typeof friends = [];

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
    <Sheet>
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
      >
        <div className="grid gap-6">
          {friendsNotInGroup.map((friends) => (
            <FriendListItem
              key={friends.userId}
              userId={friends.userId}
              nick={friends.nick}
              name={friends.name}
              avatar={friends.avatar}
              groups={friends.groups}
              friendGroups={friendGroups}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddFriendToGroupSheet;
