"use client";

import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

export interface GroupEditFormShape {
  name: string;
  description: string;
}

interface EditGroupFormProps {
  formId: string;
  defaultValues: GroupEditFormShape;
  onSubmit: SubmitHandler<GroupEditFormShape>;
}

function EditGroupForm({
  formId,
  defaultValues,
  onSubmit,
}: EditGroupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEditFormShape>();

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
