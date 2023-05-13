import GroupItem, { MemberShape } from "./GroupItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import GroupEventSheet from "./GroupEventSheet";

interface GroupCardProps {
  id: number;
  name: string;
  description: string;
  members: MemberShape[];
  activities: GroupEventShape[];
}

function GroupCard({
  id,
  name,
  description,
  members,
  activities,
}: GroupCardProps) {
  // condition makes sure that the slize never is "1 more" which is odd
  const memberSliceSize = members.length === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, memberSliceSize);

  const activitySliceSize = 5;
  const slicedEvents = activities.slice(0, activitySliceSize);

  return (
    <Card>
      <CardHeader>
        {name}
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="grid gap-2 grid-cols-6">
          {slicedEvents.map((activity) => (
            <GroupEvent
              key={activity.activityId}
              activityId={activity.activityId}
              emoji={activity.emoji}
              name={activity.name}
              // members={activity.members}
              color={activity.color}
              from={activity.from}
            />
          ))}
          <GroupEventSheet
            leftoverAmount={activities.length - activitySliceSize}
            activities={activities}
            groupName={name}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 mb-4">
          {slicedMembers.map((member) => (
            <GroupItem
              key={member.userId}
              userId={member.userId}
              nick={member.nick}
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
