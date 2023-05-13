import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface FriendListItemProps {
  userId: number;
  nick: string;
  name: string;
  avatar: string;
  groups: {
    groupId: number;
  }[];
}

function FriendListItem({ avatar, name, nick, userId }: FriendListItemProps) {
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
        {/* <div
          className={`ml-auto font-medium ${ehre <= 0 ? "text-red-600" : ""}`}
        >
          {ehre}
        </div> */}
      </div>
    </div>
  );
}

export default FriendListItem;
