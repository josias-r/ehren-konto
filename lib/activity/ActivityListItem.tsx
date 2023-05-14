import { Users } from "lucide-react";
import Activity, { ActivityShape } from "./Activity";
import eventRelativeDate from "@/lib/utilities/eventRelativeDate";
import ActivityWithPopover from "./ActivityWithPopover";
import { MemberShape } from "../group/GroupMemberListItem";

interface ActivityListItemProps extends ActivityShape {
  members: MemberShape[];
}

function ActivityListItem({
  activityId,
  name,
  emoji,
  color,
  from,
  participants,
  members,
}: ActivityListItemProps) {
  return (
    <div className="flex">
      <div className="w-12 mr-4">
        <ActivityWithPopover
          activityId={activityId}
          emoji={emoji}
          color={color}
          name={name}
          from={from}
          participants={participants}
          members={members}
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
