"use client";

import {
  EventColor,
  getEventColors,
  getEventGradient,
} from "@/lib/utilities/event-colors";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface ColorRadioGroupProps {
  className?: string;

  value: EventColor;
  onChange: (newColor: EventColor) => void;
}

function ColorRadioGroup({ className, onChange, value }: ColorRadioGroupProps) {
  return (
    <RadioGroup.Root
      className={cn("flex gap-2", className)}
      value={value}
      onValueChange={(newValue) => {
        onChange(newValue as EventColor);
      }}
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
