"use client";

import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../utils";

interface FormShape {
  name: string;
  description: string;
  members: number[];
}

interface EditGroupFormProps {
  formId: string;
}

function EditGroupForm({ formId }: EditGroupFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormShape>();

  const onSubmit: SubmitHandler<FormShape> = async (data) => {
    startTransition(() => {
      console.log(data);

      alert("WIP");
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
      </div>
    </form>
  );
}

export default EditGroupForm;
