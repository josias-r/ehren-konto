import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface GroupActivitySheetTriggerProps {
  leftoverAmount: number;
}

function GroupActivitySheetTrigger({
  leftoverAmount,
}: GroupActivitySheetTriggerProps) {
  return (
    <Button variant="outline">
      <span className="m-auto">
        {leftoverAmount > 0 ? (
          `+${leftoverAmount}`
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </span>
    </Button>
  );
}

export default GroupActivitySheetTrigger;
