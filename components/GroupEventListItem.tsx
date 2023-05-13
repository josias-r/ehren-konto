import { Users } from "lucide-react";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import eventRelativeDate from "@/lib/utilities/eventRelativeDate";

interface GroupEventListItemProps extends GroupEventShape {}

function GroupEventListItem({
  id,
  name,
  emoji,
  color,
  date,
  members,
}: GroupEventListItemProps) {
  return (
    <div className="flex">
      <div className="w-12 mr-4">
        <GroupEvent
          id={id}
          emoji={emoji}
          color={color}
          name={name}
          date={date}
          members={members}
        />
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="text-sm">
          <p>{name}</p>
          <p className="text-sm text-muted-foreground">
            {eventRelativeDate(date).formatted}
          </p>
        </div>
        <div
          className={`${
            !members.length ? "text-amber-600" : "text-muted-foreground"
          } flex items-center text-sm`}
        >
          <span className="mr-2">
            {members.length ? members.length : <>no one</>}
          </span>
          <Users size="1rem" />
        </div>
      </div>
    </div>
  );
}

export default GroupEventListItem;
