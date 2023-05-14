import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface CreateGroupSheetProps {
  children: ReactNode;
}

function CreateGroupSheet({ children }: CreateGroupSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent position="bottom" size={"content"}>
        <div className="mx-auto max-w-md mb-8">
          <SheetHeader>
            <SheetTitle>Create group</SheetTitle>
            <SheetDescription>
              Create a group and add members to it
            </SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <div className="mx-auto max-w-md px-6 sm:px-0">
            <div className="mt-8 grid gap-6">BODY</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateGroupSheet;
