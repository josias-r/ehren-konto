import { ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";

interface ActivitySheetTriggerProps {
  leftoverAmount: number;
}

function ActivitySheetTrigger({ leftoverAmount }: ActivitySheetTriggerProps) {
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

export default ActivitySheetTrigger;
