import GroupMemberListItem, { MemberShape } from "./GroupMemberListItem";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import GroupSheet from "./GroupSheet";
import { GroupEventShape } from "./GroupEvent";
import GroupEventSheet from "./GroupEventSheet";
import GroupEventEmpty from "./GroupEventEmpty";
import GroupActivitySheetTrigger from "./GroupActivitySheetTrigger";
import { Button } from "./ui/button";
import GroupEventWithPopover from "./GroupEventWithPopover";

export type GroupFriend = {
  userId: number;
  name: string;
  nick: string;
  avatar: string;
  groups: {
    groupId: number;
  }[];
};
export type GroupFriendGroup = {
  groupId: number;
  name: string;
  description: string;
};

interface GroupCardProps {
  groupId: number;
  name: string;
  description: string;
  members: MemberShape[];
  activities: GroupEventShape[];

  friends: GroupFriend[];
  friendGroups: GroupFriendGroup[];
}

function GroupCard({
  groupId,
  name,
  description,
  members,
  activities,

  friends,
  friendGroups,
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
                className="hover:scale-105 block transition-transform scale-100 p-0"
              >
                <GroupEventEmpty />
              </Button>
            </GroupEventSheet>
          )}
          {slicedEvents.map((activity) => (
            <GroupEventWithPopover
              key={activity.activityId}
              activityId={activity.activityId}
              emoji={activity.emoji}
              name={activity.name}
              participants={activity.participants}
              color={activity.color}
              from={activity.from}
              members={members}
            />
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
            <GroupMemberListItem
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
        <Separator />
        <GroupSheet
          leftoverAmount={members.length - memberSliceSize}
          members={members}
          groupId={groupId}
          friends={friends}
          friendGroups={friendGroups}
        />
      </CardContent>
    </Card>
  );
}

export default GroupCard;
