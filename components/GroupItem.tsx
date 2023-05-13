import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "@/components/ui/badge";

export type MemberShape = {
  name: string;
  nick: string;
  role: "ADMIN" | "MEMBER";
  ehre: number;
  avatar: string;
  userId: number;
};

interface GroupItemProps extends MemberShape {}

function GroupItem({ name, nick, role, ehre, avatar }: GroupItemProps) {
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
            {role !== "MEMBER" && (
              <Badge className="ml-2" variant="outline">
                {role}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">{nick}</div>
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
