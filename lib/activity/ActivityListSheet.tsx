import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ActivityShape } from "./Activity";
import ActivityContainer from "./ActivityContainer";
import ActivityListItem from "./ActivityListItem";
import { Separator } from "../../components/ui/separator";
import CreateActivitySheet from "./CreateActivitySheet";
import { ReactNode } from "react";

interface ActivityListSheetProps {
  groupId: number;
  groupName: string;
  futureEvents: ActivityShape[];
  pastEvents: ActivityShape[];
  children: ReactNode;
}

function ActivityListSheet({
  groupId,
  groupName,
  futureEvents,
  pastEvents,
  children,
}: ActivityListSheetProps) {
  return (
    <Sheet>
      <ActivityContainer>
        <SheetTrigger
          asChild
          className="flex absolute w-full h-full top-0 left-0"
        >
          {children}
        </SheetTrigger>
      </ActivityContainer>
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
            <CreateActivitySheet groupName={groupName} groupId={groupId} />
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

export default ActivityListSheet;
