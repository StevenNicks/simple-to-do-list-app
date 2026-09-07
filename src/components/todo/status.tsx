import { Circle, CircleDashed, CircleCheck, type LucideIcon } from "lucide-react"

import type { TaskStatus } from "@/lib/types"

interface StatusMeta {
   label: string
   icon: LucideIcon
   /** dot / icon accent color */
   dot: string
}

export const STATUS_META: Record<TaskStatus, StatusMeta> = {
   todo: {
      label: "Por hacer",
      icon: CircleDashed,
      dot: "text-muted-foreground",
   },
   "in-progress": {
      label: "En progreso",
      icon: Circle,
      dot: "text-amber-500 dark:text-amber-400",
   },
   done: {
      label: "Completada",
      icon: CircleCheck,
      dot: "text-emerald-600 dark:text-emerald-500",
   },
}

export const STATUS_ORDER: TaskStatus[] = ["todo", "in-progress", "done"]
