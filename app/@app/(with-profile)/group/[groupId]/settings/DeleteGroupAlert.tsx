"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import { deleteGroup } from "../../../groups/actions";
import { useRouter } from "next/navigation";
import { useLoadingToast } from "@/components/ui/use-loading-toast";

interface DeleteGroupAlertProps {
  groupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteGroupAlert({
  groupId,
  open,
  onOpenChange,
}: DeleteGroupAlertProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { loadingToastFromPromise } = useLoadingToast();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This group will be deleted for all
            members.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                await loadingToastFromPromise(
                  "Deleting group",
                  "Error deleting group",
                  deleteGroup({ groupId })
                );
                onOpenChange(false);
                router.replace("/groups");
                router.refresh();
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteGroupAlert;
