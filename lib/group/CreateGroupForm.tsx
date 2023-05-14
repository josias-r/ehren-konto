"use client";

import FormRow from "@/components/ui/FormRow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../utils";
import useControlledForm from "../hooks/useControlledForm";
import { Users } from "lucide-react";

interface FormShape {
  name: string;
  description: string;
  members: number[];
}

interface CreateGroupFormProps {
  formId: string;
}

function CreateGroupForm({ formId }: CreateGroupFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormShape>();

  const controlledRender = useControlledForm(control);

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
                  <Button
                    type="button"
                    id={id}
                    onBlur={onBlur}
                    variant="outline"
                    className={cn(className, "h-8 text-sm")}
                    onClick={() => {
                      onChange([...value, 1]);
                    }}
                  >
                    <span className="mr-2">
                      <Users size="1rem" />
                    </span>
                    <span>
                      {value.length ? <>{value.length}</> : <>no one</>}
                    </span>
                  </Button>
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
