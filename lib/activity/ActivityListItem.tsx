import { Users } from "lucide-react";
import GroupEvent, { ActivityShape } from "./Activity";
import eventRelativeDate from "@/lib/utilities/eventRelativeDate";

interface ActivityListItemProps extends ActivityShape {}

function ActivityListItem({
  activityId,
  name,
  emoji,
  color,
  from,
  participants,
}: ActivityListItemProps) {
  return (
    <div className="flex">
      <div className="w-12 mr-4">
        <GroupEvent
          activityId={activityId}
          emoji={emoji}
          color={color}
          name={name}
          from={from}
          participants={participants}
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>{name}</p>
          <p className="text-sm text-muted-foreground">
            {eventRelativeDate(from).formatted}
          </p>
        </div>
        <div
          className={`${
            !participants.length ? "text-amber-600" : "text-muted-foreground"
          } flex items-center text-sm`}
        >
          <span className="mr-2">
            {participants.length ? participants.length : <>no one</>}
          </span>
          <Users size="1rem" />
        </div>
      </div>
    </div>
  );
}

export default ActivityListItem;
