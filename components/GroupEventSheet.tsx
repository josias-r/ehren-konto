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

interface GroupEventSheetProps {
  leftoverAmount: number;
  events: GroupEventShape[];
}

function GroupEventSheet({ leftoverAmount, events }: GroupEventSheetProps) {
  const futureEvents: typeof events = [];
  const pastEvents: typeof events = [];
  events.forEach((event) => {
    if (new Date(event.date) > new Date()) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

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
          className="-mb-6 pb-6 overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 10rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">
              {futureEvents.map((event) => (
                <GroupEventListItem
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  emoji={event.emoji}
                  color={event.color}
                  date={event.date}
                  members={event.members}
                />
              ))}
              {!!pastEvents.length && !!futureEvents.length && <Separator />}
              {pastEvents.map((event) => (
                <GroupEventListItem
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  emoji={event.emoji}
                  color={event.color}
                  date={event.date}
                  members={event.members}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupEventSheet;
