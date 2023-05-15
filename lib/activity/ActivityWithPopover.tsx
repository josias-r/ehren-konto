"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Activity, { ActivityShape } from "./Activity";
import activityRelativeDate from "@/lib/activity/utilities/activityRelativeDate";
import { Separator } from "../../components/ui/separator";
import { CheckCircle, Clock2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditActivitySheet from "./EditActivitySheet";
import { useState } from "react";

interface ActivityWithPopoverProps extends ActivityShape {
  members: {
    userId: string;
    name: string;
  }[];
}

function ActivityWithPopover({
  activityId,
  emoji,
  name,
  color,
  from,
  participants,
  members,
}: ActivityWithPopoverProps) {
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const hours = from.getHours().toString().padStart(2, "0");
  const minutes = from.getMinutes().toString().padStart(2, "0");
  const fromTime = `${hours}:${minutes}`;
  return (
    <>
      <Popover>
        <PopoverTrigger className="w-full block">
          <Activity
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
                  {activityRelativeDate(from).formatted}
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
                <Separator />

                <Button size="xs" className="block w-full" type="button">
                  Participate
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  className="block w-full"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditSheetOpen(true);
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </PopoverContent>
        </PopoverTrigger>
      </Popover>
      <EditActivitySheet
        defaultValues={{
          emoji,
          name,
          color,
          from,
          fromTime: fromTime,
        }}
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        activityId={activityId}
      />
    </>
  );
}

export default ActivityWithPopover;
