import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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

interface GroupItemProps extends MemberShape {}

function GroupItem({ name, nickname, role, ehre, avatar }: GroupItemProps) {
  return (
    <div className="flex">
      <Avatar className="mr-4">
        <AvatarImage src={avatar.url} />
        <AvatarFallback>{avatar.fallback}</AvatarFallback>
      </Avatar>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>
            <span>{name}</span>
            {role !== "member" && (
              <Badge className="ml-2" variant="outline">
                {role}
              </Badge>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{nickname}</p>
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

export default GroupItem;
