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

interface GroupEventSheetProps {
  leftoverAmount: number;
  events: GroupEventShape[];
}

function GroupEventSheet({ leftoverAmount, events }: GroupEventSheetProps) {
  return (
    <Sheet>
      <GroupEventContainer>
        <SheetTrigger className="text-muted-foreground hover:bg-slate-800 rounded-sm flex absolute w-full h-full top-0 left-0">
          <span className="m-auto">+{leftoverAmount}</span>
        </SheetTrigger>
      </GroupEventContainer>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Group events</SheetTitle>
            <SheetDescription>
              There are {events.length} events in this group
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="-m-6 py-6 overflow-y-scroll"
          style={{
            maxHeight: "calc(100vh - 10rem)",
          }}
        >
          XXX
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupEventSheet;
