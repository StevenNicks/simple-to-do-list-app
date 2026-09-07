import {
   Circle,
   CircleCheck,
   CircleDashed,
   CircleSlash,
   CircleX,
   type LucideIcon,
} from "lucide-react"

import type { TaskStatus } from "@/lib/types"

interface StatusMeta {
   label: string
   icon: LucideIcon
   /** dot / icon accent color */
   dot: string
   /** soft tinted badge style */
   badge: string
}

export const STATUS_META: Record<TaskStatus, StatusMeta> = {
   todo: {
      label: "Pendiente",
      icon: CircleDashed,
      dot: "text-muted-foreground",
      badge: "border-border bg-muted text-muted-foreground",
   },
   blocked: {
      label: "Bloqueada",
      icon: CircleSlash,
      dot: "text-rose-500 dark:text-rose-400",
      badge:
         "border-rose-600/30 bg-rose-600/10 text-rose-600 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-400",
   },
   "in-progress": {
      label: "En progreso",
      icon: Circle,
      dot: "text-amber-500 dark:text-amber-400",
      badge:
         "border-amber-600/30 bg-amber-600/10 text-amber-600 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400",
   },
   done: {
      label: "Completada",
      icon: CircleCheck,
      dot: "text-emerald-600 dark:text-emerald-500",
      badge:
         "border-emerald-600/30 bg-emerald-600/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400",
   },
   cancelled: {
      label: "Cancelada",
      icon: CircleX,
      dot: "text-muted-foreground",
      badge: "border-border bg-transparent text-muted-foreground",
   },
}

export const STATUS_ORDER: TaskStatus[] = [
   "todo",
   "blocked",
   "in-progress",
   "done",
   "cancelled",
]
