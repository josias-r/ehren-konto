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
import createGroup from "@/app/api/group/create/createGroup";
import isApiError from "@/app/api/handlers/isApiError";
import isNotApiError from "@/app/api/handlers/isNotApiError";

interface CreateGroupCardProps {
  userFriends: UserFriends;
}

function CreateGroupCard({ userFriends }: CreateGroupCardProps) {
  const formId = "create-group";

  const router = useRouter();

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
            const createPromise = async () => {
              const createGroupResponse = await createGroup({ ...data });

              if (isNotApiError(createGroupResponse)) {
                router.push(
                  `/group/${createGroupResponse.createdGroup}/members`
                );
                router.refresh();
              }

              if (isApiError(createGroupResponse)) {
                throw new Error(createGroupResponse.error.message);
              }
            };
            loadingToastFromPromise(
              "Creating group",
              "Error creating group",
              createPromise()
            );
          }}
        />
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formId}>
          Create group
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CreateGroupCard;
