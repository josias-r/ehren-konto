import { GroupFriendGroup } from "./GroupCard";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface FriendListItemProps {
  userId: number;
  nick: string;
  name: string;
  avatar: string;
  groups: {
    groupId: number;
  }[];
  friendGroups: GroupFriendGroup[];
}

function FriendListItem({
  avatar,
  name,
  nick,
  groups,
  userId,
  friendGroups,
}: FriendListItemProps) {
  // get initials from name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .splice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex">
      <Avatar className="mr-4">
        <AvatarImage src={avatar} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <div>
            <span>{name}</span>
          </div>
          <div className="text-sm text-muted-foreground">{nick}</div>
        </div>
        <div className="ml-auto">
          {!!groups.length && (
            <Popover>
              <PopoverTrigger>
                <Badge variant="outline">{groups.length} Groups</Badge>
              </PopoverTrigger>
              <PopoverContent className="w-60 grid gap-2" align="end">
                {groups.map((group) => {
                  const fullGroup = friendGroups.find(
                    (friendGroup) => friendGroup.groupId === group.groupId
                  );
                  return (
                    <div className="text-sm" key={group.groupId}>
                      {fullGroup?.name}
                    </div>
                  );
                })}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendListItem;
