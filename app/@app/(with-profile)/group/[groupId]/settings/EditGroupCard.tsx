"use client";

import { Button } from "@/components/ui/button";
import EditGroupForm, { GroupEditFormShape } from "./EditGroupForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { updateGroup } from "../../../groups/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EditGroupCardProps {
  groupId: number;
  defaultValues: GroupEditFormShape;
}

function EditGroupCard({ groupId, defaultValues }: EditGroupCardProps) {
  const formId = "edit-group";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToast, errorToast } = useLoadingToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit group</CardTitle>
        <CardDescription>Edit group details</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formId}>
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EditGroupCard;
