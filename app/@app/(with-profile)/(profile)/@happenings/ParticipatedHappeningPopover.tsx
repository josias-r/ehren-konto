import ParticipatedHappening from "./ParticipatedHappening";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Activity from "@/lib/activity/Activity";
import { Info } from "lucide-react";

interface ParticipatedHappeningPopoverProps {
  happening: ParticipatedHappening;
}

function ParticipatedHappeningPopover({
  happening,
}: ParticipatedHappeningPopoverProps) {
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
    <Popover>
      <PopoverTrigger>
        <Info size="1rem" />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="flex items-center text-sm w-48"
      >
        <div className="w-10 mr-4">
          <Activity
            emoji={happening.RelatedActivity.emoji}
            color={happening.RelatedActivity.color}
            isParticipating={false}
          />
        </div>
        <strong>{happening.RelatedActivity.name}</strong>
      </PopoverContent>
    </Popover>
  );
}

export default ParticipatedHappeningPopover;
