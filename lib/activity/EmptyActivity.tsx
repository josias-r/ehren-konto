import { CalendarOff } from "lucide-react";
import GroupEventContainer from "./ActivityContainer";

function EmptyActivity() {
  return (
    <GroupEventContainer className="flex border border-border border-dashed text-muted-foreground">
      <CalendarOff className="w-4 h-4 m-auto block" />
    </GroupEventContainer>
  );
}

export default EmptyActivity;
