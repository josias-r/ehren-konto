import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import GroupEvent, { GroupEventShape } from "./GroupEvent";
import eventRelativeDate from "@/lib/utilities/eventRelativeDate";
import { Separator } from "./ui/separator";
import { CheckCircle, Clock2, Users } from "lucide-react";

interface GroupEventWithPopoverProps extends GroupEventShape {
  members: {
    userId: number;
    name: string;
  }[];
}

function GroupEventWithPopover({
  activityId,
  emoji,
  name,
  color,
  from,
  participants,
  members,
}: GroupEventWithPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <GroupEvent
          activityId={activityId}
          emoji={emoji}
          name={name}
          participants={participants}
          color={color}
          from={from}
        />
        <PopoverContent className="w-60" align="start">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none flex justify-between">
                {name}
                <div
                  className={`${
                    !participants.length
                      ? "text-amber-600"
                      : "text-muted-foreground"
                  } flex items-center text-sm font-normal`}
                >
                  <span className="mr-2">
                    {participants.length ? participants.length : <>no one</>}
                  </span>
                  <Users size="1rem" />
                </div>
              </h4>
              <p className="text-sm text-muted-foreground">
                {eventRelativeDate(from).formatted}
              </p>

              {!!participants.length && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    {participants.map((participant) => {
                      const user = members.find(
                        (member) => member.userId === participant.userId
                      );
                      return (
                        <div
                          key={participant.userId}
                          className="text-sm text-muted-foreground flex items-center"
                        >
                          <div className="w-6">
                            {participant.confirmed ? (
                              <Clock2 size="1rem" />
                            ) : (
                              <CheckCircle
                                size="1rem"
                                className="text-green-700"
                              />
                            )}
                          </div>
                          <p>{user?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
}

export default GroupEventWithPopover;
