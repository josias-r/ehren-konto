import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RelevantHappenings } from "./getRelevantHappenings";
import getInitialsFromName from "@/app/@app/(with-profile)/(profile)/getInitialsFromName";
import ActivityWithPopover from "@/lib/activity/ActivityWithPopover";
import EhrePoints from "@/app/@app/(with-profile)/(profile)/@happenings/EhrePoints";

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
  let happeningTitle = "";
  switch (happening.type) {
    case "ACTIVITY_PARTICIPATION":
      happeningTitle = "joined";
      break;
    case "ACTIVITY_PARTICIPATION_CONFIRMED":
      happeningTitle = "confirmed";
      break;
    case "ACTIVITY_PARTICIPATION_REMOVED":
      happeningTitle = "left";
      break;
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-grow flex-shrink-0">
        <Avatar className="mr-4">
          {happening.RelatedUser.avatar && (
            <AvatarImage src={happening.RelatedUser.avatar} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">
            <strong>{happening.RelatedUser.name}</strong> earned{" "}
            <strong>
              <EhrePoints
                showPlus
                amount={happening.happeningData.pointsDiff}
              />
            </strong>{" "}
            ehre
          </p>
          <p className="text-sm text-muted-foreground">
            Because he is participating in{" "}
            <strong>{happening.RelatedActivity.name}</strong>
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 flex-grow-0 w-12">
        <ActivityWithPopover
          activityId={happening.RelatedActivity.activityId}
          emoji={happening.RelatedActivity.emoji}
          name={happening.RelatedActivity.name}
          color={happening.RelatedActivity.color}
          from={happening.RelatedActivity.from}
          participants={happening.RelatedActivity.ActivityParticipants.map(
            (participant) => ({
              userId: participant.UserId,
              confirmed: participant.confirmed,
              name: participant.UserName,
            })
          )}
        />
      </div>
    </div>
  );
}

export default ParticipatedHappening;
