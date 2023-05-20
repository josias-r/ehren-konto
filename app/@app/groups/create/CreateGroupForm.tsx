"use client";

import FormRow from "@/components/ui/FormRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../../../../lib/utils";
import useControlledForm from "../../../../lib/hooks/useControlledForm";
import { Users } from "lucide-react";
import SelectFriendsSheet from "./SelectFriendsSheet";
import { createGroup } from "../actions";
import { UserFriends, UserGroups } from "../../friends/getAllFriendsForUser";

interface FormShape {
  name: string;
  description: string;
  members: string[];
}

interface CreateGroupFormProps {
  onDone: () => void;
  formId: string;

  userFriends: UserFriends;
  userGroups: UserGroups;
}

function CreateGroupForm({
  onDone,
  formId,

  userFriends,
  userGroups,
}: CreateGroupFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormShape>();

  const controlledRender = useControlledForm(control);

  const onSubmit: SubmitHandler<FormShape> = (data) => {
    startTransition(async () => {
      await createGroup({ ...data });
      onDone();
    });
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <FormRow label="Name" id="name" required errors={errors}>
          {({ id, name, className, required }) => (
            <Input
              id={id}
              className={cn(className, "h-8")}
              {...register(name, {
                required,
              })}
            />
          )}
        </FormRow>
        <FormRow label="Description" id="description" required errors={errors}>
          {({ id, name, className, required }) => (
            <Input
              id={id}
              className={cn(className, "h-8")}
              {...register(name, {
                required,
              })}
            />
          )}
        </FormRow>
        <FormRow label="Members" id="members" required errors={errors}>
          {({ id, name, className, required }) => (
            <>
              {controlledRender(
                [
                  "members",
                  {
                    rules: {
                      required,
                    },
                    defaultValue: [],
                  },
                ],
                ({ field: { onChange, onBlur, value } }) => (
                  <SelectFriendsSheet
                    chosenFriends={value}
                    userFriends={userFriends}
                    userGroups={userGroups}
                    onChosenFriendsChange={onChange}
                  >
                    <Button
                      type="button"
                      className={cn(className, "h-8 text-sm")}
                      id={id}
                      onBlur={onBlur}
                      variant="outline"
                    >
                      <span className="mr-2">
                        <Users size="1rem" />
                      </span>
                      <span>
                        {value.length ? <>{value.length}</> : <>no one</>}
                      </span>
                    </Button>
                  </SelectFriendsSheet>
                )
              )}
            </>
          )}
        </FormRow>
      </div>
    </form>
  );
}

export default CreateGroupForm;
