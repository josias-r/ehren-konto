import GroupItem, { MemberShape } from "./GroupItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import GroupEventSheet from "./GroupEventSheet";

interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  members: MemberShape[];
  events: GroupEventShape[];
}

function GroupCard({ id, name, description, members, events }: GroupCardProps) {
  // condition makes sure that the slize never is "1 more" which is odd
  const memberSliceSize = members.length === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, memberSliceSize);

  const eventSliceSize = 5;
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
          <GroupEventSheet
            leftoverAmount={events.length - eventSliceSize}
            events={events}
            groupName={name}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 mb-4">
          {slicedMembers.map((member) => (
            <GroupItem
              key={member.id}
              id={member.id}
              nickname={member.nickname}
              name={member.name}
              role={member.role}
              ehre={member.ehre}
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
