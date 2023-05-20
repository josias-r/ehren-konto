import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Activity, { ActivityShape } from "./Activity";
import activityRelativeDate from "@/lib/activity/utilities/activityRelativeDate";
import { Separator } from "../../components/ui/separator";
import { CheckCircle, Clock2, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ActivityParticipateButton from "./ActivityParticipateButton";
import Link from "next/link";
import { cn } from "../utils";

interface ActivityWithPopoverProps extends ActivityShape {}

function ActivityWithPopover({
  activityId,
  emoji,
  name,
  color,
  from,
  participants,
}: ActivityWithPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger className="w-full block">
        <Activity emoji={emoji} color={color} />
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
                {activityRelativeDate(from).formatted}
              </p>
              {!!participants.length && (
                <>
                  <Separator />
                  <div className="grid gap-2">
                    {participants.map((participant) => {
                      return (
                        <div
                          key={participant.userId}
                          className="text-sm text-muted-foreground flex items-center"
                        >
                          <div className="w-6">
                            {!participant.confirmed ? (
                              <Clock2 size="1rem" />
                            ) : (
                              <CheckCircle
                                size="1rem"
                                className="text-green-700"
                              />
                            )}
                          </div>
                          <p>{participant?.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              <Separator />

              <ActivityParticipateButton activityId={activityId} />
              <Link
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "xs",
                  }),
                  "flex"
                )}
                href={`/activities/edit/${activityId}`}
              >
                Edit
              </Link>
            </div>
          </div>
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
}

export default ActivityWithPopover;
