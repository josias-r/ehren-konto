import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import EmojiPicker from "@/components/ui/emoji-picker";
import ColorRadioGroup from "@/components/ui/color-radio-group";

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
            <SheetTitle>Create new group activity</SheetTitle>
            <SheetDescription>{groupName}</SheetDescription>
          </SheetHeader>
        </div>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 15rem)",
          }}
        >
          <form action="">
            <div className="mx-auto max-w-md px-6 sm:px-0">
              <div className="mt-8 grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="icon">Icon</Label>
                  <div className="h-8 w-full col-span-2 grid grid-cols-4">
                    <EmojiPicker className="h-8 w-full flex justify-center" />
                    <ColorRadioGroup
                      id="color"
                      required
                      defaultValue={"SUNSET"}
                      className="h-8 px-4 col-span-3 py-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-2 h-8"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="from">Date</Label>
                  <DatePicker
                    id="from"
                    className="h-8 w-full col-span-2"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="fromTime">Time</Label>
                  <Input
                    type="time"
                    placeholder=" "
                    id="fromTime"
                    defaultValue=""
                    className="h-8 w-full col-span-2"
                  />
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <Button type="submit" className="block w-full">
                  Create activity
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateActivitySheet;
