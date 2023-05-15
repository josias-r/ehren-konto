"use client";

import {
  ActivityColor,
  getActivityColors,
  getActivityGradient,
} from "@/lib/activity/utilities/activity-colors";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface ColorRadioGroupProps {
  className?: string;

  value: ActivityColor;
  onChange: (newColor: ActivityColor) => void;
}

function ColorRadioGroup({ className, onChange, value }: ColorRadioGroupProps) {
  return (
    <RadioGroup.Root
      className={cn("flex gap-2", className)}
      value={value}
      onValueChange={(newValue) => {
        onChange(newValue as ActivityColor);
      }}
    >
      {getActivityColors().map((color) => {
        const gradient = getActivityGradient(color);
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
