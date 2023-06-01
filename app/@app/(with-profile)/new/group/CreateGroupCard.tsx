"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateGroupForm from "./CreateGroupForm";
import { useRouter } from "next/navigation";
import { UserFriends } from "../../friends/getAllFriendsForUser";
import { useLoadingToast } from "@/components/ui/use-loading-toast";
import { useTransition } from "react";
import { createGroup } from "../../groups/actions";

interface CreateGroupCardProps {
  userFriends: UserFriends;
}

function CreateGroupCard({ userFriends }: CreateGroupCardProps) {
  const formId = "create-group";

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const { loadingToastFromPromise } = useLoadingToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create group</CardTitle>
        <CardDescription>Create a group and add members to it</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateGroupForm
          formId={formId}
          userFriends={userFriends}
          onSubmit={(data) => {
            startTransition(async () => {
              await loadingToastFromPromise(
                "Creating group",
                "Error creating group",
                createGroup({ ...data }).then((createdGroupId) => {
                  router.push(`/group/${createdGroupId}/members`);
                  router.refresh();
                })
              );
            });
          }}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formId} disabled={isPending}>
          Create group
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreateGroupCard;
