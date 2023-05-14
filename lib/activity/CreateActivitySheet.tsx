import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";

interface CreateActivitySheetProps {
  groupName: string;
}

function CreateActivitySheet({ groupName }: CreateActivitySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="block w-full">
          Create new group activity
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

export default CreateActivitySheet;
