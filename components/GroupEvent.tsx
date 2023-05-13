import { EventColor, getEventGradient } from "@/lib/utilities/event-colors";
import GroupEventContainer from "./GroupEventContainer";

export type GroupEventShape = {
  activityId: number;
  emoji: string;
  color: EventColor;
  name: string;
  from: Date;
  // participants: string[];
};

interface GroupEventProps extends GroupEventShape {}

function GroupEvent({ color, emoji }: GroupEventProps) {
  const gradient = getEventGradient(color);
  return (
    <div className="w-full">
      <GroupEventContainer
        className="flex"
        style={{
          background: gradient,
        }}
      >
        <span className="m-auto">{emoji}</span>
      </GroupEventContainer>
      {/* <p className="text-xs text-muted-foreground text-center">in 9 days</p> */}
    </div>
  );
}

export default GroupEvent;
