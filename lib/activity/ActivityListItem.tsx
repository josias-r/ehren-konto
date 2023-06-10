import { Users } from "lucide-react";
import Activity, { ActivityShape } from "./Activity";
import activityRelativeDate from "@/lib/activity/utilities/activityRelativeDate";
import ActivityWithPopover, {
  useIsParticipatingInActivity,
} from "./ActivityWithPopover";
import Link from "next/link";

interface ActivityListItemProps extends ActivityShape {
  groupId: number;
}

function ActivityListItem({
  activityId,
  name,
  emoji,
  color,
  from,
  participants,

  groupId,
}: ActivityListItemProps) {
  const isParticipating = useIsParticipatingInActivity({ participants });

  return (
    <Link
      className="flex"
      href={`/group/${groupId}/activity/edit/${activityId}`}
    >
      <div className="w-12 mr-4">
        <Activity
          emoji={emoji}
          color={color}
          isParticipating={isParticipating}
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>{name}</p>
          <p className="text-sm text-muted-foreground">
            {activityRelativeDate(from).formatted}
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
    </Link>
  );
}

export default ActivityListItem;
