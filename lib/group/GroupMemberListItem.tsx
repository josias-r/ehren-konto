import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import getInitialsFromName from "../user/getInitialsFromName";

export type MemberShape = {
  name: string;
  nick: string;
  role: "ADMIN" | "MEMBER";
  ehre: number;
  avatar: string | null;
  userId: string;
};

interface GroupMemberListItemProps extends MemberShape {}

function GroupMemberListItem({
  name,
  nick,
  role,
  ehre,
  avatar,
}: GroupMemberListItemProps) {
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
            {role !== "MEMBER" && (
              <Badge className="ml-2" variant="outline">
                {role}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{nick}</div>
        </div>
        <div
          className={`ml-auto font-medium ${
            ehre <= 0 ? "text-destructive" : ""
          }`}
        >
          {ehre}
        </div>
      </div>
    </div>
  );
}

export default GroupMemberListItem;
