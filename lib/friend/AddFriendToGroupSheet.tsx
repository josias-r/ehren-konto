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
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Add members to group</SheetTitle>
            <SheetDescription>
              <div className="text-sm text-muted-foreground">
                {!!friendsInGroup.length && (
                  <>{friendsInGroup.length} friends are already in this group</>
                )}
                {!friendsInGroup.length && (
                  <>None of your friends are in this group yet</>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="-mb-6 pb-6 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 10rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default AddFriendToGroupSheet;
