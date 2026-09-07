"use client"

import * as React from "react"
import { CalendarDays, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { formatShortDate, toISODate } from "@/lib/format-date"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateFilterProps {
   value?: Date
   onChange: (date?: Date) => void
}

export function DateFilter({ value, onChange }: DateFilterProps) {
   const [open, setOpen] = React.useState(false)

   return (
      <div className="relative flex-1">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  className={cn(
                     "w-full justify-start px-3 font-normal",
                     value ? "pr-9" : "text-muted-foreground"
                  )}
               >
                  <CalendarDays className="text-muted-foreground" />
                  {value ? formatShortDate(toISODate(value)) : "Todas las fechas"}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  mode="single"
                  selected={value}
                  defaultMonth={value}
                  onSelect={(date) => {
                     onChange(date)
                     setOpen(false)
                  }}
               />
            </PopoverContent>
         </Popover>

         {value && (
            <Button
               variant="ghost"
               size="icon"
               onClick={() => onChange(undefined)}
               className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground"
               aria-label="Quitar filtro de fecha"
            >
               <X className="size-4" />
            </Button>
         )}
      </div>
   )
}
