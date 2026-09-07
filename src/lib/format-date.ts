import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns"
import { es } from "date-fns/locale"

/** yyyy-MM-dd for a given date (local time). */
export function toISODate(date: Date): string {
   return format(date, "yyyy-MM-dd")
}

/** Parse a yyyy-MM-dd string as a local date at midnight. */
export function fromISODate(value: string): Date {
   return parseISO(value)
}

/** "18 de enero de 2026" */
export function formatLongDate(value: string): string {
   return format(fromISODate(value), "d 'de' MMMM 'de' yyyy", { locale: es })
}

/** "18 ene 2026" — compact, safe for narrow buttons */
export function formatMediumDate(value: string): string {
   return format(fromISODate(value), "d MMM yyyy", { locale: es })
}

/** Short, relative-aware label: "Hoy", "Mañana", "Ayer" or "18 ene". */
export function formatShortDate(value: string): string {
   const date = fromISODate(value)
   if (isToday(date)) return "Hoy"
   if (isTomorrow(date)) return "Mañana"
   if (isYesterday(date)) return "Ayer"
   return format(date, "d MMM", { locale: es })
}
