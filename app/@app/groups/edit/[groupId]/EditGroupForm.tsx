"use client";

import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../../../../../lib/utils";
import { updateGroup } from "../../../../../lib/group/actions";

export interface GroupEditFormShape {
  name: string;
  description: string;
}

interface EditGroupFormProps {
  formId: string;
  groupId: number;
  defaultValues: GroupEditFormShape;
  onDone: () => void;
}

function EditGroupForm({
  formId,
  groupId,
  defaultValues,
  onDone,
}: EditGroupFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEditFormShape>();

  const onSubmit: SubmitHandler<GroupEditFormShape> = async (data) => {
    startTransition(async () => {
      await updateGroup({ ...data, groupId });
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
              defaultValue={defaultValues.name}
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
              defaultValue={defaultValues.description}
              className={cn(className, "h-8")}
              {...register(name, {
                required,
              })}
            />
          )}
        </FormRow>
      </div>
    </form>
  );
}

export default EditGroupForm;
