import FriendListItem from "./FriendListItem";
import { GroupFriend, GroupFriendGroup } from "./GroupCard";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface GroupAddMemberSheetProps {
  groupId: number;
  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function GroupAddMemberSheet({
  friends,
  groupId,
  friendGroups,
}: GroupAddMemberSheetProps) {
  const friendsInGroup: typeof friends = [];
  const friendsNotInGroup: typeof friends = [];

  friends.forEach((friend) => {
    if (friend.groups.some((group) => group.groupId === groupId)) {
      friendsInGroup.push(friend);
    } else {
      friendsNotInGroup.push(friend);
    }
  });

  return (
    <Sheet>
      <div className="relative -mx-2 -mb-2 text-muted-foreground">
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

export default GroupAddMemberSheet;
