import { ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { GroupMember } from "./GroupCard";
import GroupItem from "./GroupItem";

interface GroupSheetProps {
  leftoverAmount: number;
  members: GroupMember[];
}

function GroupSheet({ leftoverAmount, members }: GroupSheetProps) {
  return (
    <Sheet>
      <div className="relative -mx-2 -mb-2 text-muted-foreground">
        <SheetTrigger className="hover:bg-slate-800 rounded-sm w-full flex justify-between items-center text-sm p-2 mt-2">
          <div>Show {leftoverAmount} more</div>
          <div>
            <ChevronRight className="h-4 w-4" />
          </div>
        </SheetTrigger>
      </div>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Group members</SheetTitle>
            <SheetDescription>
              There are {members.length} members in this group
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
              {members.map((member) => (
                <GroupItem
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  amount={member.ehre}
                  avatar={member.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default GroupSheet;
