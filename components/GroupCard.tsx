import GroupItem from "./GroupItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import GroupEventSheet from "./GroupEventSheet";

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
  events: GroupEventShape[];
}

function GroupCard({ id, name, description, members, events }: GroupCardProps) {
  // condition makes sure that the slize never is "1 more" which is odd
  const memberSliceSize = members.length === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, memberSliceSize);

  const eventSliceSize = events.length >= 6 ? 5 : 6;
  const slicedEvents = events.slice(0, eventSliceSize);

  return (
    <Card>
      <CardHeader>
        {name}
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="grid gap-2 grid-cols-6">
          {slicedEvents.map((event) => (
            <GroupEvent
              key={event.id}
              id={event.id}
              emoji={event.emoji}
              name={event.name}
              members={event.members}
              color={event.color}
              date={event.date}
            />
          ))}
          {events.length > eventSliceSize && (
            <>
              <GroupEventSheet
                leftoverAmount={events.length - eventSliceSize}
                events={events}
              />
            </>
          )}
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
        {members.length > memberSliceSize && (
          <>
            <Separator />
            <GroupSheet
              leftoverAmount={members.length - memberSliceSize}
              members={members}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default GroupCard;
