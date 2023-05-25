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
import CreateGroupForm from "./CreateGroupForm";
import { useRouter } from "next/navigation";
import { UserFriends } from "../../friends/getAllFriendsForUser";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { useTransition } from "react";
import { createGroup } from "../actions";

interface CreateGroupSheetProps {
  userFriends: UserFriends;
}

function CreateGroupSheet({ userFriends }: CreateGroupSheetProps) {
  const formId = "create-group";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToast, errorToast } = useLoadingToast();

  return (
    <Sheet
      open={!isPending} // close immediately while pending, will close also because of router.back() once done
      onOpenChange={() => router.back()}
    >
      <SheetContent
        headerChildren={
          <SheetHeader>
            <SheetTitle>Create group</SheetTitle>
            <SheetDescription>
              Create a group and add members to it
            </SheetDescription>
          </SheetHeader>
        }
        footerChildren={
          <SheetFooter>
            <Button type="submit" form={formId}>
              Create group
            </Button>
          </SheetFooter>
        }
      >
        <CreateGroupForm
          formId={formId}
          userFriends={userFriends}
          onSubmit={(data) => {
            startTransition(async () => {
              const { dismissLoadingToast } = loadingToast("Creating group");
              try {
                await createGroup({ ...data });
                dismissLoadingToast();
                router.back();
                router.refresh();
              } catch (e) {
                console.error(e);
                errorToast("Failed to create group");
              }
            });
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CreateGroupSheet;
