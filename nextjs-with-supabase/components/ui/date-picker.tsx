// components/ui/date-picker.tsx 
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  // Allow Date, null, or undefined as value for flexibility with form state
  value?: Date | null; 
  // RHF's onChange typically passes Date | undefined
  onChange: (date: Date | undefined) => void; 
  disabled?: boolean;
  className?: string; // Allow passing custom styles/layout classes
}

export function DatePicker({ value, onChange, disabled, className } : DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal", // Default width
            !value && "text-muted-foreground",
            className // Apply passed className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {/* Ensure value is a valid Date before formatting */}
          {value instanceof Date && !isNaN(value.getTime()) ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
           // Pass Date or undefined to Calendar component
          selected={value ?? undefined}
           // Pass selected date (or undefined if deselected) directly to RHF's onChange
          onSelect={onChange}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}