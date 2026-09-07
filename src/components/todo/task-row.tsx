"use client"

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatShortDate } from "@/lib/format-date"
import { STATUS_META } from "@/components/todo/status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskRowProps {
   task: Task
   onToggleDone: (task: Task) => void
   onEdit: (task: Task) => void
   onDelete: (task: Task) => void
}

export function TaskRow({ task, onToggleDone, onEdit, onDelete }: TaskRowProps) {
   const meta = STATUS_META[task.status]
   const done = task.status === "done"

   return (
      <div className="group relative flex gap-3 px-4 py-3 transition-colors hover:bg-muted/50">
         <Checkbox
            checked={done}
            onCheckedChange={() => onToggleDone(task)}
            className="mt-0.5 size-[18px]"
            aria-label={done ? "Marcar como pendiente" : "Marcar como completada"}
         />

         <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
               <p
                  className={cn(
                     "text-sm font-medium leading-tight",
                     done && "text-muted-foreground line-through"
                  )}
               >
                  {task.title}
               </p>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="-mt-1 -mr-1 size-8 shrink-0 text-muted-foreground transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 sm:data-[state=open]:opacity-100"
                     >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Opciones</span>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                     <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Pencil className="size-4" />
                        Editar
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete(task)}
                     >
                        <Trash2 className="size-4" />
                        Eliminar
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            {task.description && (
               <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                  {task.description}
               </p>
            )}

            <div className="mt-2 flex items-center gap-2">
               <Badge variant="secondary" className="gap-1.5 font-normal">
                  <meta.icon className={cn("size-3", meta.dot)} />
                  {meta.label}
               </Badge>
               <span className="text-xs text-muted-foreground">
                  {formatShortDate(task.date)}
               </span>
            </div>
         </div>
      </div>
   )
}
