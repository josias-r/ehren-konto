import GroupMemberListItem, { MemberShape } from "./GroupMemberListItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActivityShape } from "@/lib/activity/Activity";
import EmptyActivity from "@/lib/activity/EmptyActivity";
import { buttonVariants } from "@/components/ui/button";
import ActivityWithPopover from "@/lib/activity/ActivityWithPopover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface GroupCardProps {
  groupId: number;
  name: string;
  description: string;
  totalMembers: number;
  totalActivities: number;
  members: MemberShape[];
  activities: ActivityShape[];
}

function GroupCard({
  groupId,
  name,
  description,
  members,
  activities,
  totalMembers,
  totalActivities,
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
  const memberSliceSize = totalMembers === 6 ? 4 : 5;
  const slicedMembers = members.slice(0, memberSliceSize);

  const activitySliceSize = 5;
  const slicedEvents = futureEvents.slice(0, activitySliceSize);

  const activitiesLeftoverAmount = totalActivities - activitySliceSize;

  const membersLeftoverAmount = totalMembers - memberSliceSize;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 grid-cols-6 mb-4">
          {!slicedEvents.length && (
            <Link
              href={`/groups/activities/${groupId}`}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "hover:scale-105 transition-transform scale-100 p-0 relative block h-auto"
              )}
            >
              <EmptyActivity />
            </Link>
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
              groupId={groupId}
            />
          ))}
          <Link
            href={`/groups/activities/${groupId}`}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "h-full"
            )}
          >
            <span className="m-auto">
              {activitiesLeftoverAmount > 0 ? (
                `+${activitiesLeftoverAmount}`
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          </Link>
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
        <Link
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-full flex justify-between items-center text-sm p-2 mt-2"
          )}
          href={`/group/${groupId}/members`}
        >
          <div>
            {membersLeftoverAmount > 1 && (
              <>Show {membersLeftoverAmount} more</>
            )}
            {membersLeftoverAmount <= 1 && <>Manage group</>}
          </div>
          <div>
            <ChevronRight className="h-4 w-4" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export default GroupCard;
