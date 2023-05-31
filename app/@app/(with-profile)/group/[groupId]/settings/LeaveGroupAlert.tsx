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
import { leaveGroup } from "../../../groups/actions";
import { useRouter } from "next/navigation";

interface LeaveGroupAlertProps {
  groupId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onDone: () => void;
}

function LeaveGroupAlert({
  groupId,
  open,
  onOpenChange,
  onDone,
}: LeaveGroupAlertProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. You will not have access to the group
            anymore.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                await leaveGroup({ groupId });
                router.push("/groups");
                router.refresh();
                onDone();
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

export default LeaveGroupAlert;
