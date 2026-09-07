"use client"

import type { Task, TaskStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatShortDate } from "@/lib/format-date"
import { STATUS_META, STATUS_ORDER } from "@/components/todo/status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Item, ItemContent, ItemMedia } from "@/components/ui/item"

interface TaskRowProps {
   task: Task
   onStatusChange: (task: Task, status: TaskStatus) => void
   onOpenDetail: (task: Task) => void
}

export function TaskRow({ task, onStatusChange, onOpenDetail }: TaskRowProps) {
   const meta = STATUS_META[task.status]
   const closed = task.status === "done" || task.status === "cancelled"

   return (
      <Item className="rounded-none px-4 py-3 transition-colors hover:bg-muted/50">
         <ItemMedia variant="icon" className="self-start">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="size-[18px] rounded-full p-0 hover:bg-transparent"
                     aria-label={`Estado: ${meta.label}. Cambiar estado`}
                  >
                     <meta.icon className={cn("size-[18px]", meta.dot)} />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-44">
                  <DropdownMenuRadioGroup
                     value={task.status}
                     onValueChange={(value) =>
                        onStatusChange(task, value as TaskStatus)
                     }
                  >
                     {STATUS_ORDER.map((status) => {
                        const statusMeta = STATUS_META[status]
                        return (
                           <DropdownMenuRadioItem key={status} value={status}>
                              <statusMeta.icon
                                 className={cn("size-4", statusMeta.dot)}
                              />
                              {statusMeta.label}
                           </DropdownMenuRadioItem>
                        )
                     })}
                  </DropdownMenuRadioGroup>
               </DropdownMenuContent>
            </DropdownMenu>
         </ItemMedia>

         <ItemContent className="min-w-0 gap-1">
            <button
               type="button"
               onClick={() => onOpenDetail(task)}
               aria-label={`Ver detalle de ${task.title}`}
               className="flex w-full min-w-0 flex-col items-start gap-0.5 rounded-sm text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
               <span
                  className={cn(
                     "line-clamp-2 w-full text-sm font-medium leading-tight break-words",
                     closed && "text-muted-foreground line-through"
                  )}
               >
                  {task.title}
               </span>
               {task.description && (
                  <span className="line-clamp-2 w-full text-sm break-words text-muted-foreground">
                     {task.description}
                  </span>
               )}
            </button>

            <div className="mt-1 flex items-center gap-2">
               <Badge className={cn("gap-1.5 font-normal", meta.badge)}>
                  <meta.icon className="size-3 text-current" />
                  {meta.label}
               </Badge>
               <span className="text-xs text-muted-foreground">
                  {formatShortDate(task.date)}
               </span>
            </div>
         </ItemContent>
      </Item>
   )
}
