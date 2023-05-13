import GroupItem, { MemberShape } from "./GroupItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import GroupEventSheet from "./GroupEventSheet";
import GroupEventEmpty from "./GroupEventEmpty";
import GroupActivitySheetTrigger from "./GroupActivitySheetTrigger";
import { Button } from "./ui/button";

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
          {!slicedEvents.length && (
            <GroupEventSheet activities={activities} groupName={name}>
              <Button
                variant="ghost"
                className="hover:scale-105 block transition-transform scale-100"
              >
                <GroupEventEmpty />
              </Button>
            </GroupEventSheet>
          )}
          {slicedEvents.map((activity) => (
            <GroupEventSheet
              key={activity.activityId}
              activities={activities}
              groupName={name}
            >
              <Button
                variant="ghost"
                className="p-0 hover:scale-105 transition-transform scale-100"
              >
                <GroupEvent
                  activityId={activity.activityId}
                  emoji={activity.emoji}
                  name={activity.name}
                  // members={activity.members}
                  color={activity.color}
                  from={activity.from}
                />
              </Button>
            </GroupEventSheet>
          ))}
          <GroupEventSheet activities={activities} groupName={name}>
            <GroupActivitySheetTrigger
              leftoverAmount={activities.length - activitySliceSize}
            />
          </GroupEventSheet>
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
