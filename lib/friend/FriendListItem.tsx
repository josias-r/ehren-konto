import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type MemberShape = {
  name: string;
  nickname: string;
  role: "admin" | "member";
  ehre: number;
  avatar: {
    url: string;
    fallback: string;
  };
  id: string;
};

interface FriendListItemProps extends MemberShape {}

function FriendListItem({
  name,
  nickname,
  role,
  ehre,
  avatar,
}: FriendListItemProps) {
  return (
    <div className="flex">
      <Avatar className="mr-4">
        <AvatarImage src={avatar.url} />
        <AvatarFallback>{avatar.fallback}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <div>
            <span>{name}</span>
            {role !== "member" && (
              <Badge className="ml-2" variant="outline">
                {role}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{nickname}</div>
        </div>
        <div
          className={`ml-auto font-medium ${ehre <= 0 ? "text-red-600" : ""}`}
        >
          {ehre}
        </div>
      </div>
    </div>
  );
}

export default FriendListItem;
