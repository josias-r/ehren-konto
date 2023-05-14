import { CalendarOff } from "lucide-react";
import ActivityContainer from "./ActivityContainer";

function EmptyActivity() {
  return (
    <ActivityContainer className="flex border border-border border-dashed text-muted-foreground">
      <CalendarOff className="w-4 h-4 m-auto block" />
    </ActivityContainer>
  );
}

export default EmptyActivity;
