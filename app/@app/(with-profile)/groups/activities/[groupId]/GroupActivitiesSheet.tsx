"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { GroupActivities } from "./getGroupActivities";
import ActivityListItem from "@/lib/activity/ActivityListItem";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface GroupActivitiesSheetProps {
  activities: NonNullable<GroupActivities>;
}

function GroupActivitiesSheet({ activities }: GroupActivitiesSheetProps) {
  const futureEvents: typeof activities = [];
  const pastEvents: typeof activities = [];

  activities.forEach((activity) => {
    if (activity.from > new Date()) {
      futureEvents.push(activity);
    } else {
      pastEvents.push(activity);
    }
  });

  const router = useRouter();

  const params = useParams();

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Group activities</SheetTitle>
            <SheetDescription>
              There are {futureEvents.length} upcoming activities and{" "}
              {pastEvents.length} past activities in this group.
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Link
              className={cn(buttonVariants())}
              href={`/groups/activities/${params.groupId}/create`}
            >
              Create activity
            </Link>
          </SheetFooter>
        }
      >
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
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupActivitiesSheet;
