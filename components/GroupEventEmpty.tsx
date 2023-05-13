import { CalendarOff } from "lucide-react";
import GroupEventContainer from "./GroupEventContainer";

function GroupEventEmpty() {
  return (
    <GroupEventContainer className="flex border-2 border-muted-foreground border-dashed text-muted-foreground">
      <CalendarOff className="w-4 h-4 m-auto block" />
    </GroupEventContainer>
  );
}

export default GroupEventEmpty;
