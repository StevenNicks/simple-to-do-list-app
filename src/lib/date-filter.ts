import { format } from "date-fns"
import { es } from "date-fns/locale"

import type { DateFilterValue } from "@/lib/types"
import { formatMediumDate } from "@/lib/format-date"

/** Whether a task's ISO date (yyyy-MM-dd) passes the active date filter. */
export function matchesDateFilter(
   taskDate: string,
   filter: DateFilterValue | null
): boolean {
   if (!filter) return true
   switch (filter.mode) {
      case "day":
         return taskDate === filter.date
      case "range":
         return taskDate >= filter.from && taskDate <= filter.to
      case "month": {
         const [year, month] = taskDate.split("-").map(Number)
         return year === filter.year && month === filter.month + 1
      }
      case "year":
         return Number(taskDate.slice(0, 4)) === filter.year
   }
}

function capitalize(value: string): string {
   return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Human label for the filter trigger button. */
export function dateFilterLabel(filter: DateFilterValue | null): string {
   if (!filter) return "Todas las fechas"
   switch (filter.mode) {
      case "day":
         return formatMediumDate(filter.date)
      case "range":
         return `${formatMediumDate(filter.from)} – ${formatMediumDate(filter.to)}`
      case "month":
         return capitalize(
            format(new Date(filter.year, filter.month, 1), "LLLL yyyy", { locale: es })
         )
      case "year":
         return String(filter.year)
   }
}
