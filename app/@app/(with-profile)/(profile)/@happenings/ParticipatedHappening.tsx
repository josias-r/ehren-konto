import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RelevantHappenings } from "./getRelevantHappenings";
import getInitialsFromName from "@/app/@app/(with-profile)/(profile)/getInitialsFromName";
import ActivityWithPopover from "@/lib/activity/ActivityWithPopover";
import EhrePoints from "@/app/@app/(with-profile)/(profile)/@happenings/EhrePoints";
import activityRelativeDate from "@/lib/activity/utilities/activityRelativeDate";
import ParticipatedHappeningPopover from "./ParticipatedHappeningPopover";

type ParticipatedHappening = Omit<
  RelevantHappenings[number],
  "happeningData"
> & {
  happeningData: {
    pointsDiff: number;
  };
  RelatedUser: NonNullable<RelevantHappenings[number]["RelatedUser"]>;
  RelatedActivity: NonNullable<RelevantHappenings[number]["RelatedActivity"]>;
};

export function isParticipatedHappening(
  happening: RelevantHappenings[number]
): happening is ParticipatedHappening {
  return (
    happening.type === "ACTIVITY_PARTICIPATION" ||
    happening.type === "ACTIVITY_PARTICIPATION_CONFIRMED" ||
    happening.type === "ACTIVITY_PARTICIPATION_REMOVED"
  );
}

interface ParticipatedHappeningProps {
  happening: ParticipatedHappening;
}

function ParticipatedHappening({ happening }: ParticipatedHappeningProps) {
  const initials = getInitialsFromName(happening.RelatedUser.name);
  let happeningVerb = "";
  switch (happening.type) {
    case "ACTIVITY_PARTICIPATION":
      happeningVerb = "earned";
      break;
    case "ACTIVITY_PARTICIPATION_CONFIRMED":
      happeningVerb = "earned";
      break;
    case "ACTIVITY_PARTICIPATION_REMOVED":
      happeningVerb = "lost";
      break;
  }
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex flex-grow flex-shrink relative overflow-hidden">
        <Avatar className="mr-4 flex-shrink-0 flex-grow-0">
          {happening.RelatedUser.avatar && (
            <AvatarImage src={happening.RelatedUser.avatar} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-shrink min-w-0 flex-grow">
          <p className="text-sm min-w-0 whitespace-nowrap text-ellipsis overflow-hidden">
            <strong>{happening.RelatedUser.name}</strong> {happeningVerb}{" "}
            <strong>
              <EhrePoints
                showPlus
                amount={happening.happeningData.pointsDiff}
              />
            </strong>{" "}
            ehre
          </p>
          <p className="text-sm text-muted-foreground">
            {activityRelativeDate(happening.createdAt).formatted}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 flex-grow-0">
        <ParticipatedHappeningPopover happening={happening} />
      </div>
    </div>
  );
}

export default ParticipatedHappening;
