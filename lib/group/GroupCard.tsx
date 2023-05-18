import GroupMemberListItem, { MemberShape } from "./GroupMemberListItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import GroupSheet from "./GroupSheet";
import { ActivityShape } from "../activity/Activity";
import ActivityListSheet from "../activity/ActivityListSheet";
import EmptyActivity from "../activity/EmptyActivity";
import ActivitySheetTrigger from "../activity/ActivitySheetTrigger";
import { Button } from "../../components/ui/button";
import ActivityWithPopover from "../activity/ActivityWithPopover";

export type GroupFriend = {
  userId: string;
  name: string;
  nick: string;
  avatar: string | null;
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
  activities: ActivityShape[];

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
  const futureEvents: typeof activities = [];
  const pastEvents: typeof activities = [];

  activities.forEach((activity) => {
    if (activity.from > new Date()) {
      futureEvents.push(activity);
    } else {
      pastEvents.push(activity);
    }
  });

  // condition makes sure that the slize never is "1 more" which is odd
  const memberSliceSize = members.length === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, memberSliceSize);

  const activitySliceSize = 5;
  const slicedEvents = futureEvents.slice(0, activitySliceSize);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 grid-cols-6 mb-4">
          {!slicedEvents.length && (
            <ActivityListSheet
              futureEvents={futureEvents}
              pastEvents={pastEvents}
              groupName={name}
              groupId={groupId}
              members={members}
            >
              <Button
                variant="ghost"
                className="hover:scale-105 block transition-transform scale-100 p-0"
              >
                <EmptyActivity />
              </Button>
            </ActivityListSheet>
          )}
          {slicedEvents.map((activity) => (
            <ActivityWithPopover
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
          <ActivityListSheet
            groupId={groupId}
            futureEvents={futureEvents}
            pastEvents={pastEvents}
            groupName={name}
            members={members}
          >
            <ActivitySheetTrigger
              leftoverAmount={futureEvents.length - activitySliceSize}
            />
          </ActivityListSheet>
        </div>
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
          name={name}
          description={description}
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
