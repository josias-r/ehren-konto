"use client";

import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";

import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import useControlledForm from "@/lib/hooks/useControlledForm";
import EmojiPicker from "@/components/ui/emoji-picker";
import ColorRadioGroup from "@/components/ui/color-radio-group";
import { ActivityColor } from "@/lib/activity/utilities/activity-colors";
import { DatePicker } from "@/components/ui/date-picker";

export interface ActivityEditFormShape {
  color: ActivityColor;
  name: string;
  emoji: string;
  from: Date | null;
  fromTime: string;
}

interface EditActivityFormProps {
  formId: string;
  defaultValues: ActivityEditFormShape;

  onSubmit: SubmitHandler<ActivityEditFormShape>;
}

function EditActivityForm({
  formId,
  defaultValues,

  onSubmit,
}: EditActivityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ActivityEditFormShape>();

  const controlledRender = useControlledForm(control);

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <FormRow label="Icon" id="emoji" required errors={errors}>
          {({ id, name, className, required }) => (
            <>
              <div className={cn(className, "grid grid-cols-4")}>
                {controlledRender(
                  [
                    "emoji",
                    {
                      defaultValue: defaultValues.emoji,
                      rules: {
                        required,
                      },
                    },
                  ],
                  ({ field: { value, onChange } }) => (
                    <EmojiPicker
                      className="h-8 w-full flex justify-center px-0"
                      value={value}
                      onChange={onChange}
                    />
                  )
                )}
                {controlledRender(
                  [
                    "color",
                    {
                      rules: {
                        required,
                      },
                      defaultValue: defaultValues.color,
                    },
                  ],
                  ({ field: { value, onChange } }) => (
                    <ColorRadioGroup
                      value={value}
                      className="h-8 px-4 py-1 col-span-3"
                      onChange={onChange}
                    />
                  )
                )}
              </div>
            </>
          )}
        </FormRow>
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
        <FormRow label="Time" id="fromTime" required errors={errors}>
          {({ id, name, className, required }) => (
            <Input
              id={id}
              type="time"
              defaultValue={defaultValues.fromTime}
              className={cn(className, "h-8")}
              {...register(name, {
                required,
              })}
            />
          )}
        </FormRow>
        <FormRow label="Date" id="from" required errors={errors}>
          {({ id, name, className, required }) => (
            <>
              {controlledRender(
                [
                  name,
                  {
                    rules: {
                      required,
                    },
                    defaultValue: defaultValues.from,
                  },
                ],
                ({ field: { value, onChange } }) => (
                  <DatePicker
                    id={id}
                    className={cn(className, "h-8 w-full")}
                    required={!!required}
                    value={value}
                    onChange={(newDate) => onChange(newDate || null)}
                  />
                )
              )}
            </>
          )}
        </FormRow>
      </div>
    </form>
  );
}

export default EditActivityForm;
