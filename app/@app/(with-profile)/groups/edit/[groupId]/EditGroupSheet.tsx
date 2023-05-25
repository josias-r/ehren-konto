"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import EditGroupForm, { GroupEditFormShape } from "./EditGroupForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { updateGroup } from "../../actions";

interface EditGroupSheetProps {
  groupId: number;
  defaultValues: GroupEditFormShape;
}

function EditGroupSheet({ groupId, defaultValues }: EditGroupSheetProps) {
  const formId = "edit-group";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToast, errorToast } = useLoadingToast();

  return (
    <Sheet open onOpenChange={() => router.back()}>
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Edit group</SheetTitle>
            <SheetDescription>Edit group details</SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button type="submit" form={formId}>
              Edit group
            </Button>
          </SheetFooter>
        }
      >
        <EditGroupForm
          formId={formId}
          defaultValues={defaultValues}
          onSubmit={(data) => {
            startTransition(async () => {
              const { dismissLoadingToast } = loadingToast("Saving group");
              try {
                await updateGroup({ ...data, groupId });
                dismissLoadingToast();
                router.back();
                router.refresh();
              } catch (error) {
                dismissLoadingToast();
                errorToast("Error editing group");
              }
            });
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default EditGroupSheet;
