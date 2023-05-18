import ActivityWithPopover from "../activity/ActivityWithPopover";
import { NormalizedUpcomingActivities } from "./getUpcomingActivities";

interface UpcomingActivityItemProps {
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
  activity: NormalizedUpcomingActivities[number][1]["activities"][number];
}

function UpcomingActivityItem({
  activity,
  isFirstInGroup,
  isLastInGroup,
}: UpcomingActivityItemProps) {
  return (
    <div
      className={`upcoming-activity-item ${
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
