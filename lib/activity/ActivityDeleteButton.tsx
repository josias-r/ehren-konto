"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { deleteActivity } from "./actions";
import { useRouter } from "next/navigation";
import { useLoadingToast } from "@/components/ui/use-loading-toast";

interface ActivityDeleteButtonProps {
  activityId: number;
}

function ActivityDeleteButton({ activityId }: ActivityDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { errorToast } = useLoadingToast();

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          size="xs"
          variant="destructive"
          className="block w-full"
          disabled={isPending}
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This activity will be deleted for all
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
                try {
                  await deleteActivity({ activityId });
                } catch (error) {
                  errorToast("Could not delete activity");
                } finally {
                  setOpen(false);
                  router.refresh();
                }
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

export default ActivityDeleteButton;
