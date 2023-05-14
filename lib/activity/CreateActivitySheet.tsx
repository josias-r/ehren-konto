import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import CreateActivityForm from "./CreateActivityForm";

interface CreateActivitySheetProps {
  groupName: string;
}

function CreateActivitySheet({ groupName }: CreateActivitySheetProps) {
  const formId = "create-activity";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create new group activity</Button>
      </SheetTrigger>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Create new group activity</SheetTitle>
            <SheetDescription>{groupName}</SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button form={formId} type="submit">
              Create activity
            </Button>
          </SheetFooter>
        }
      >
        <CreateActivityForm formId={formId} />
      </SheetContent>
    </Sheet>
  );
}

export default CreateActivitySheet;
