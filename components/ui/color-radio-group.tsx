"use client";

import { useState } from "react";
import {
  EventColor,
  getEventColors,
  getEventGradient,
} from "@/lib/utilities/event-colors";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface ColorRadioGroupProps {
  id?: string;
  required?: boolean;
  className?: string;

  /** passing null or a date tells this component that is should be controlled */
  defaultValue?: EventColor;
  value?: EventColor | null;
  onChange?: (newColor?: EventColor) => void;
}

function ColorRadioGroup({
  id,
  className,
  required,
  onChange,
  defaultValue,
  value,
}: ColorRadioGroupProps) {
  const [uncontrolledSelectedEmoji, setUncontrolledSelectedEmoji] =
    useState<string>();

  const selectedEmoji =
    value === undefined ? uncontrolledSelectedEmoji : value || undefined;

  return (
    <RadioGroup.Root
      className={cn("flex gap-2", className)}
      id={id}
      required={required}
      defaultValue={defaultValue}
    >
      {getEventColors().map((color) => {
        const gradient = getEventGradient(color);
        return (
          <RadioGroup.Item
            key={color}
            value={color}
            className="relative w-6 h-6 rounded-full border-2 border-muted [&[data-state='checked']]:border-foreground overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: gradient,
              }}
            ></div>
            <RadioGroup.Indicator></RadioGroup.Indicator>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}

export default ColorRadioGroup;
