"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import type { Task } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatMediumDate, fromISODate, toISODate } from "@/lib/format-date"
import { STATUS_META, STATUS_ORDER } from "@/components/todo/status"
import type { TaskDraft } from "@/hooks/use-tasks"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TaskFormDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   /** When provided, the dialog edits this task; otherwise it creates one. */
   task?: Task | null
   onSubmit: (draft: TaskDraft) => void
}

function emptyDraft(): TaskDraft {
   return {
      title: "",
      description: "",
      status: "todo",
      date: toISODate(new Date()),
   }
}

export function TaskFormDialog({
   open,
   onOpenChange,
   task,
   onSubmit,
}: TaskFormDialogProps) {
   const isEdit = Boolean(task)
   const [draft, setDraft] = React.useState<TaskDraft>(emptyDraft)
   const [dateOpen, setDateOpen] = React.useState(false)

   // Reset the form whenever the dialog opens.
   React.useEffect(() => {
      if (!open) return
      setDraft(
         task
            ? {
                 title: task.title,
                 description: task.description,
                 status: task.status,
                 date: task.date,
              }
            : emptyDraft()
      )
   }, [open, task])

   const canSubmit = draft.title.trim().length > 0

   function handleSubmit(event: React.FormEvent) {
      event.preventDefault()
      if (!canSubmit) return
      onSubmit({ ...draft, title: draft.title.trim(), description: draft.description.trim() })
      onOpenChange(false)
   }

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-md">
            <form onSubmit={handleSubmit}>
               <DialogHeader>
                  <DialogTitle>{isEdit ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
                  <DialogDescription>
                     {isEdit
                        ? "Actualiza los detalles de esta tarea."
                        : "Añade una tarea a tu lista con título, descripción y estado."}
                  </DialogDescription>
               </DialogHeader>

               <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                     <Label htmlFor="task-title">Título</Label>
                     <Input
                        id="task-title"
                        autoFocus
                        value={draft.title}
                        onChange={(event) =>
                           setDraft((prev) => ({ ...prev, title: event.target.value }))
                        }
                        placeholder="p. ej. Preparar la demo"
                        required
                     />
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="task-description">Descripción</Label>
                     <Textarea
                        id="task-description"
                        value={draft.description}
                        onChange={(event) =>
                           setDraft((prev) => ({
                              ...prev,
                              description: event.target.value,
                           }))
                        }
                        placeholder="Detalles, contexto o pasos a seguir (opcional)"
                        className="min-h-24 resize-none"
                     />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
                     <div className="grid gap-2">
                        <Label htmlFor="task-status">Estado</Label>
                        <Select
                           value={draft.status}
                           onValueChange={(value) =>
                              setDraft((prev) => ({
                                 ...prev,
                                 status: value as TaskDraft["status"],
                              }))
                           }
                        >
                           <SelectTrigger id="task-status" className="w-full">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              {STATUS_ORDER.map((status) => {
                                 const meta = STATUS_META[status]
                                 return (
                                    <SelectItem key={status} value={status}>
                                       <meta.icon className={cn("size-4", meta.dot)} />
                                       {meta.label}
                                    </SelectItem>
                                 )
                              })}
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="grid gap-2">
                        <Label htmlFor="task-date">Fecha</Label>
                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                           <PopoverTrigger asChild>
                              <Button
                                 id="task-date"
                                 type="button"
                                 variant="outline"
                                 className="w-full justify-start px-3 font-normal"
                              >
                                 <CalendarIcon className="text-muted-foreground" />
                                 <span className="truncate">
                                    {formatMediumDate(draft.date)}
                                 </span>
                              </Button>
                           </PopoverTrigger>
                           <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                 mode="single"
                                 selected={fromISODate(draft.date)}
                                 defaultMonth={fromISODate(draft.date)}
                                 onSelect={(date) => {
                                    if (!date) return
                                    setDraft((prev) => ({
                                       ...prev,
                                       date: toISODate(date),
                                    }))
                                    setDateOpen(false)
                                 }}
                              />
                           </PopoverContent>
                        </Popover>
                     </div>
                  </div>
               </div>

               <DialogFooter>
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => onOpenChange(false)}
                  >
                     Cancelar
                  </Button>
                  <Button type="submit" disabled={!canSubmit}>
                     {isEdit ? "Guardar cambios" : "Crear tarea"}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
