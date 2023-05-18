import { RelevantHappenings } from "./getRelevantHappenings";
import ParticipatedHappening, {
  isParticipatedHappening,
} from "./ParticipatedHappening";

interface HappeningItemProps {
  happening: RelevantHappenings[number];
}

function HappeningItem({ happening }: HappeningItemProps) {
  if (isParticipatedHappening(happening)) {
    return <ParticipatedHappening happening={happening} />;
  }
  return <div>{"unknown entry"}</div>;
}

export default HappeningItem;
