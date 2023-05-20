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
import { deleteGroup } from "../../../../../lib/group/actions";

interface DeleteGroupAlertProps {
  groupId: number;
  onDone: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteGroupAlert({
  groupId,
  onDone,
  open,
  onOpenChange,
}: DeleteGroupAlertProps) {
  const [isPending, startTransition] = useTransition();

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
            onClick={() => {
              startTransition(async () => {
                await deleteGroup({ groupId });

                onDone();
                onOpenChange(false);
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
