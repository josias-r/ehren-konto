import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { GroupEventShape } from "./GroupEvent";
import GroupEventContainer from "./GroupEventContainer";
import GroupEventListItem from "./GroupEventListItem";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface GroupCreateEventSheetProps {
  groupName: string;
}

function GroupCreateEventSheet({ groupName }: GroupCreateEventSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="block w-full">
          Create new event or activity
        </Button>
      </SheetTrigger>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Create event for {groupName} </SheetTitle>
            <SheetDescription>Desc</SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">xx</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupCreateEventSheet;
