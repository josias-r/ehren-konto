"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  id?: string;
  required?: boolean;
  className?: string;

  /** passing null or a date tells this component that is should be controlled */
  value?: Date | null;
  onChange?: (newDate?: Date) => void;
}

export function DatePicker({
  id,
  className,
  required,
  onChange,
  value,
}: DatePickerProps) {
  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date>();

  const date = value === undefined ? uncontrolledDate : value || undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <input
            className="absolute  inset-0 opacity-0"
            required={required}
            id={id}
            value={date?.toLocaleTimeString() || ""}
            onChange={() => {}}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setUncontrolledDate(newDate);
            onChange?.(newDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
