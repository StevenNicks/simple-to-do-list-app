"use client"

import * as React from "react"
import {
   addDays,
   endOfMonth,
   endOfWeek,
   startOfMonth,
   startOfWeek,
   subDays,
} from "date-fns"
import { CalendarDays, X } from "lucide-react"
import type { DateRange, DropdownProps } from "react-day-picker"

import type { DateFilterValue } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatMediumDate, fromISODate, toISODate } from "@/lib/format-date"
import { dateFilterLabel } from "@/lib/date-filter"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DateFilterProps {
   value: DateFilterValue | null
   onChange: (value: DateFilterValue | null) => void
}

type Tab = "date" | "range"

const CALENDAR_CLASS = { className: "w-full p-0", classNames: { root: "w-full" } }

export function DateFilter({ value, onChange }: DateFilterProps) {
   const [open, setOpen] = React.useState(false)
   const [tab, setTab] = React.useState<Tab>(value?.mode === "range" ? "range" : "date")

   // Re-sync the popover to the active filter each time it opens.
   React.useEffect(() => {
      if (!open) return
      setTab(value?.mode === "range" ? "range" : "date")
   }, [open, value])

   function commit(next: DateFilterValue) {
      onChange(next)
      setOpen(false)
   }

   return (
      <div className="relative flex-1">
         <Popover open={open} onOpenChange={setOpen} modal>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  className={cn(
                     "w-full justify-start px-3 font-normal",
                     value ? "pr-9" : "text-muted-foreground"
                  )}
               >
                  <CalendarDays className="text-muted-foreground" />
                  <span className="truncate">{dateFilterLabel(value)}</span>
               </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 max-w-[calc(100vw-2rem)] p-0" align="start">
               <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
                  <div className="border-b p-2">
                     <TabsList className="w-full">
                        <TabsTrigger value="date" className="text-xs">
                           Fecha
                        </TabsTrigger>
                        <TabsTrigger value="range" className="text-xs">
                           Rango
                        </TabsTrigger>
                     </TabsList>
                  </div>

                  {tab === "date" && (
                     <DatePanel
                        value={value}
                        onPickDay={(date) =>
                           commit({ mode: "day", date: toISODate(date) })
                        }
                        onWholeMonth={(year, month) =>
                           commit({ mode: "month", year, month })
                        }
                        onWholeYear={(year) => commit({ mode: "year", year })}
                     />
                  )}

                  {tab === "range" && (
                     <RangePanel
                        onApply={(from, to) =>
                           commit({
                              mode: "range",
                              from: toISODate(from),
                              to: toISODate(to),
                           })
                        }
                     />
                  )}
               </Tabs>
            </PopoverContent>
         </Popover>

         {value && (
            <Button
               variant="ghost"
               size="icon"
               onClick={() => onChange(null)}
               className="absolute top-1/2 right-1 size-7 -translate-y-1/2 text-muted-foreground"
               aria-label="Quitar filtro de fecha"
            >
               <X className="size-4" />
            </Button>
         )}
      </div>
   )
}

function DatePanel({
   value,
   onPickDay,
   onWholeMonth,
   onWholeYear,
}: {
   value: DateFilterValue | null
   onPickDay: (date: Date) => void
   onWholeMonth: (year: number, month: number) => void
   onWholeYear: (year: number) => void
}) {
   const now = new Date()

   const initialMonth =
      value?.mode === "day"
         ? fromISODate(value.date)
         : value?.mode === "month"
           ? new Date(value.year, value.month, 1)
           : value?.mode === "year"
             ? new Date(value.year, 0, 1)
             : now
   const [displayMonth, setDisplayMonth] = React.useState<Date>(initialMonth)

   const year = displayMonth.getFullYear()
   const month = displayMonth.getMonth()

   const monthActive =
      value?.mode === "month" && value.year === year && value.month === month
   const yearActive = value?.mode === "year" && value.year === year

   return (
      <div className="space-y-3 p-3">
         <Calendar
            mode="single"
            captionLayout="dropdown"
            hideNavigation
            startMonth={new Date(now.getFullYear() - 10, 0)}
            endMonth={new Date(now.getFullYear() + 10, 11)}
            month={displayMonth}
            onMonthChange={setDisplayMonth}
            selected={
               value?.mode === "day" ? fromISODate(value.date) : undefined
            }
            onSelect={(date) => {
               if (date) onPickDay(date)
            }}
            components={{ Dropdown: CalendarDropdown }}
            className="w-full p-0"
            classNames={{
               root: "w-full",
               month_caption: "flex w-full items-center justify-center py-1",
               dropdowns: "flex w-full items-center gap-2",
               dropdown_root: "flex-1",
            }}
         />

         <div className="grid grid-cols-2 gap-2">
            <Button
               type="button"
               variant={monthActive ? "default" : "outline"}
               size="sm"
               className="font-normal"
               onClick={() => onWholeMonth(year, month)}
            >
               Todo el mes
            </Button>
            <Button
               type="button"
               variant={yearActive ? "default" : "outline"}
               size="sm"
               className="font-normal"
               onClick={() => onWholeYear(year)}
            >
               Todo el año
            </Button>
         </div>
      </div>
   )
}

/** Month / year navigation dropdown rendered as a shadcn Select. */
function CalendarDropdown({ options, value, onChange, "aria-label": ariaLabel }: DropdownProps) {
   return (
      <Select
         value={value?.toString()}
         onValueChange={(next) =>
            onChange?.({
               target: { value: next },
            } as React.ChangeEvent<HTMLSelectElement>)
         }
      >
         <SelectTrigger
            aria-label={ariaLabel}
            className="min-h-9 w-full justify-between font-medium"
         >
            <SelectValue />
         </SelectTrigger>
         <SelectContent
            position="popper"
            sideOffset={4}
            className="max-h-[min(18rem,var(--radix-select-content-available-height))]"
         >
            {options?.map((option) => (
               <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                  disabled={option.disabled}
               >
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

function RangePanel({ onApply }: { onApply: (from: Date, to: Date) => void }) {
   // Always starts blank so the first click unambiguously sets the start date.
   const [range, setRange] = React.useState<DateRange | undefined>(undefined)

   const from = range?.from
   const to = range?.to
   const today = new Date()

   const presets: { label: string; from: Date; to: Date }[] = [
      { label: "Últimos 7 días", from: subDays(today, 6), to: today },
      { label: "Próximos 30 días", from: today, to: addDays(today, 29) },
      { label: "Esta semana", from: startOfWeek(today, { weekStartsOn: 1 }), to: endOfWeek(today, { weekStartsOn: 1 }) },
      { label: "Este mes", from: startOfMonth(today), to: endOfMonth(today) },
   ]

   const singleDay = from && to && +from === +to
   const hint = !from
      ? "Elige la fecha de inicio"
      : !to || singleDay
        ? "Ahora elige la fecha de fin"
        : "Rango listo — pulsa Aplicar"

   return (
      <div className="space-y-3 p-3">
         <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
               <Button
                  key={p.label}
                  type="button"
                  variant="outline"
                  size="xs"
                  className="font-normal"
                  onClick={() => setRange({ from: p.from, to: p.to })}
               >
                  {p.label}
               </Button>
            ))}
         </div>

         <div className="grid grid-cols-2 gap-2">
            <div
               className={cn(
                  "rounded-md border px-2 py-1.5 text-xs",
                  !from && "border-primary bg-accent"
               )}
            >
               <div className="text-muted-foreground">Desde</div>
               <div className="font-medium tabular-nums">
                  {from ? formatMediumDate(toISODate(from)) : "—"}
               </div>
            </div>
            <div
               className={cn(
                  "rounded-md border px-2 py-1.5 text-xs",
                  from && (!to || singleDay) && "border-primary bg-accent"
               )}
            >
               <div className="text-muted-foreground">Hasta</div>
               <div className="font-medium tabular-nums">
                  {to ? formatMediumDate(toISODate(to)) : "—"}
               </div>
            </div>
         </div>

         <Calendar
            mode="range"
            selected={range}
            defaultMonth={from ?? today}
            onSelect={setRange}
            {...CALENDAR_CLASS}
         />

         <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">{hint}</p>
            <div className="flex gap-1.5">
               <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={!from && !to}
                  onClick={() => setRange(undefined)}
               >
                  Limpiar
               </Button>
               <Button
                  type="button"
                  size="sm"
                  disabled={!from || !to}
                  onClick={() => from && to && onApply(from, to)}
               >
                  Aplicar
               </Button>
            </div>
         </div>
      </div>
   )
}
