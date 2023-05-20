"use client";

import FormRow from "@/components/ui/FormRow";
import { Input } from "@/components/ui/input";

import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import useControlledForm from "@/lib/hooks/useControlledForm";
import EmojiPicker from "@/components/ui/emoji-picker";
import ColorRadioGroup from "@/components/ui/color-radio-group";
import { ActivityColor } from "@/lib/activity/utilities/activity-colors";
import { DatePicker } from "@/components/ui/date-picker";
import { createActivity } from "@/lib/activity/actions";

interface FormShape {
  color: ActivityColor;
  name: string;
  emoji: string;
  from: Date | null;
  fromTime: string;
}

interface CreateActivityFormProps {
  formId: string;
  groupId: number;

  onDone: () => void;
}

function CreateActivityForm({
  formId,
  onDone,
  groupId,
}: CreateActivityFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormShape>();

  const controlledRender = useControlledForm(control);

  const onSubmit: SubmitHandler<FormShape> = async (data) => {
    startTransition(async () => {
      if (!data.from) {
        throw new Error("No from date");
      }
      const fullFromDate = new Date(data.from);
      const [hours, minutes] = data.fromTime.split(":");
      fullFromDate.setHours(parseInt(hours));
      fullFromDate.setMinutes(parseInt(minutes));

      await createActivity({
        name: data.name,
        emoji: data.emoji,
        color: data.color,
        from: fullFromDate,
        groupId,
      });
      onDone();
    });
  };

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
                      defaultValue: "SUNSET",
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
              defaultValue=""
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
        <FormRow label="Time" id="fromTime" required errors={errors}>
          {({ id, name, className, required }) => (
            <Input
              id={id}
              type="time"
              defaultValue=""
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

export default CreateActivityForm;
