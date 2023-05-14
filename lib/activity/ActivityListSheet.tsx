import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ActivityShape } from "./Activity";
import GroupEventContainer from "./ActivityContainer";
import ActivityListItem from "./ActivityListItem";
import { Separator } from "../../components/ui/separator";
import CreateActivitySheet from "./CreateActivitySheet";
import { ReactNode } from "react";

interface ActivityListSheetProps {
  groupName: string;
  activities: ActivityShape[];
  children: ReactNode;
}

function ActivityListSheet({
  groupName,
  activities,
  children,
}: ActivityListSheetProps) {
  const futureEvents: typeof activities = [];
  const pastEvents: typeof activities = [];
  activities.forEach((activity) => {
    if (activity.from > new Date()) {
      futureEvents.push(activity);
    } else {
      pastEvents.push(activity);
    }
  });

  return (
    <Sheet>
      <GroupEventContainer>
        <SheetTrigger
          asChild
          className="flex absolute w-full h-full top-0 left-0"
        >
          {children}
        </SheetTrigger>
      </GroupEventContainer>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Group activities</SheetTitle>
            <SheetDescription>
              There are {activities.length} activities in this group
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">
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
          </div>
        </div>
        <div className="mx-auto max-w-md pt-6">
          <CreateActivitySheet groupName={groupName} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ActivityListSheet;
