"use client"

import * as React from "react"
import { CalendarSearch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"

interface TaskByDateProps {
   selectedDate?: Date
   onDateChange: (date: Date | undefined) => void
}

export function TaskByDate({ selectedDate, onDateChange }: TaskByDateProps) {
   const [open, setOpen] = React.useState(false)

   return (
      <div className="flex flex-col gap-3">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  size="icon"
                  className={selectedDate ? "bg-primary/10 border-primary/30" : ""}
               >
                  <CalendarSearch className="text-muted-foreground" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
               <Calendar
                  mode="single"
                  selected={selectedDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                     onDateChange(date)
                     setOpen(false)
                  }}
               />
            </PopoverContent>
         </Popover>
      </div>
   )
}
