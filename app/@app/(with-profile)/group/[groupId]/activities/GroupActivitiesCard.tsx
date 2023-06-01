"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GroupActivities } from "./getGroupActivities";
import ActivityListItem from "@/lib/activity/ActivityListItem";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GroupActivitiesCardProps {
  activities: NonNullable<GroupActivities>;
}

function GroupActivitiesCard({ activities }: GroupActivitiesCardProps) {
  const futureEvents: typeof activities = [];
  const pastEvents: typeof activities = [];

  activities.forEach((activity) => {
    if (activity.from > new Date()) {
      futureEvents.push(activity);
    } else {
      pastEvents.push(activity);
    }
  });

  const params = useParams();

  const groupId = parseInt(params.groupId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group activities</CardTitle>
        <CardDescription>
          There are {futureEvents.length} upcoming activities and{" "}
          {pastEvents.length} past activities in this group.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {futureEvents.map((activity) => (
            <ActivityListItem
              key={activity.activityId}
              activityId={activity.activityId}
              name={activity.name}
              emoji={activity.emoji}
              color={activity.color}
              from={activity.from}
              participants={activity.participants}
              groupId={groupId}
            />
          ))}
          {!!pastEvents.length && !!futureEvents.length && <Separator />}
          {pastEvents.map((activity) => (
            <ActivityListItem
              key={activity.activityId}
              activityId={activity.activityId}
              name={activity.name}
              emoji={activity.emoji}
              color={activity.color}
              from={activity.from}
              participants={activity.participants}
              groupId={groupId}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          className={cn(buttonVariants())}
          href={`/group/${params.groupId}/new/activity`}
        >
          Create activity
        </Link>
      </CardFooter>
    </Card>
  );
}

export default GroupActivitiesCard;
