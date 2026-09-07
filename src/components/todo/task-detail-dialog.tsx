"use client"

import { Pencil, Trash2 } from "lucide-react"

import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatLongDate, formatTimestamp } from "@/lib/format-date"
import { STATUS_META } from "@/components/todo/status"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TaskDetailDialogProps {
   task: Task | null
   open: boolean
   onOpenChange: (open: boolean) => void
   onEdit: (task: Task) => void
   onDelete: (task: Task) => void
}

export function TaskDetailDialog({
   task,
   open,
   onOpenChange,
   onEdit,
   onDelete,
}: TaskDetailDialogProps) {
   if (!task) return null

   const meta = STATUS_META[task.status]

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="grid max-h-[85dvh] grid-rows-[auto_minmax(0,1fr)_auto] gap-4 sm:max-w-md">
            <DialogHeader>
               <DialogTitle className="pr-6 text-left break-words">
                  {task.title}
               </DialogTitle>
               <DialogDescription asChild>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                     <Badge className={cn("gap-1.5 font-normal", meta.badge)}>
                        <meta.icon className="size-3 text-current" />
                        {meta.label}
                     </Badge>
                     <span className="text-xs text-muted-foreground">
                        {formatLongDate(task.date)}
                     </span>
                  </div>
               </DialogDescription>
            </DialogHeader>

            <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3">
               <ScrollArea hideScrollbar className="-mx-1 px-1">
                  <p
                     className={cn(
                        "text-sm break-words whitespace-pre-wrap",
                        task.description
                           ? "text-foreground"
                           : "text-muted-foreground italic"
                     )}
                  >
                     {task.description || "Sin descripción."}
                  </p>
               </ScrollArea>

               <p className="text-xs text-muted-foreground">
                  Creada el {formatTimestamp(task.createdAt)}
               </p>
            </div>

            <DialogFooter>
               <Button variant="outline" onClick={() => onEdit(task)}>
                  <Pencil className="size-4" />
                  Editar
               </Button>
               <Button variant="destructive" onClick={() => onDelete(task)}>
                  <Trash2 className="size-4" />
                  Eliminar
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
