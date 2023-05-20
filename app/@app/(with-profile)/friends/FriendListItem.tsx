import { GroupFriendGroup } from "../groups/GroupCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import getInitialsFromName from "../(profile)/getInitialsFromName";

interface FriendListItemProps {
  userId: string;
  nick: string;
  name: string;
  avatar: string | null;
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
  const initials = getInitialsFromName(name);

  return (
    <div className="flex">
      <Avatar className="mr-4">
        {avatar && <AvatarImage src={avatar} />}
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
