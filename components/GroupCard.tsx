import { ChevronRight } from "lucide-react";
import GroupItem from "./GroupItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";

export type GroupMember = {
  name: string;
  nickname: string;
  role: string;
  ehre: number;
  avatar: {
    url: string;
    fallback: string;
  };
  id: string;
};

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
}

function GroupCard({ id, name, description, members }: GroupCardProps) {
  // condition makes sure that the slize never is "1 more" which is odd
  const slizeSize = members.length === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, slizeSize);

  return (
    <Card>
      <CardHeader>
        {name}
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex gap-2">
          <div className="flex w-12 h-12 rounded bg-cyan-300/50">
            <span className="m-auto">⛺️</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 mb-4">
          {slicedMembers.map((member) => (
            <GroupItem
              key={member.id}
              name={member.name}
              role={member.role}
              amount={member.ehre}
              avatar={member.avatar}
            />
          ))}
        </div>
        {members.length > slizeSize && (
          <>
            <Separator />
            <GroupSheet
              leftoverAmount={members.length - slicedMembers.length}
              members={members}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default GroupCard;
