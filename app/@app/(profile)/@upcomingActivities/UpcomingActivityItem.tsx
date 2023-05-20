import ActivityWithPopover from "@/lib/activity/ActivityWithPopover";
import { NormalizedUpcomingActivities } from "./getUpcomingActivities";

interface UpcomingActivityItemProps {
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  color: string;
  activity: NormalizedUpcomingActivities[number][1]["activities"][number];
}

function UpcomingActivityItem({
  activity,
  isFirstInGroup,
  isLastInGroup,
  color,
}: UpcomingActivityItemProps) {
  return (
    <div
      className={`upcoming-activity-item ${color} ${
        isFirstInGroup ? "uai-first-in-group" : ""
      } ${isLastInGroup ? "uai-last-in-group" : ""}`}
    >
      <ActivityWithPopover
        activityId={activity.activityId}
        emoji={activity.emoji}
        name={activity.name}
        color={activity.color}
        from={activity.from}
        // participants and members are the same for upcoming activities, because there is no overall "members" list
        participants={activity.participants}
        members={activity.participants}
      />
    </div>
  );
}

export default UpcomingActivityItem;
