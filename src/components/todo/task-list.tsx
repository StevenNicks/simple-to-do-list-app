"use client"

import { CalendarX2, ListChecks, Plus } from "lucide-react"

import type { Task, TaskStatus } from "@/lib/types"
import { TaskRow } from "@/components/todo/task-row"
import { Button } from "@/components/ui/button"
import {
   Empty,
   EmptyContent,
   EmptyDescription,
   EmptyHeader,
   EmptyMedia,
   EmptyTitle,
} from "@/components/ui/empty"

interface TaskListProps {
   tasks: Task[]
   hasAnyTask: boolean
   onCreate: () => void
   onClearFilters: () => void
   onStatusChange: (task: Task, status: TaskStatus) => void
   onEdit: (task: Task) => void
   onDelete: (task: Task) => void
}

export function TaskList({
   tasks,
   hasAnyTask,
   onCreate,
   onClearFilters,
   onStatusChange,
   onEdit,
   onDelete,
}: TaskListProps) {
   if (tasks.length === 0) {
      return (
         <Empty className="border-0 py-14">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  {hasAnyTask ? <CalendarX2 /> : <ListChecks />}
               </EmptyMedia>
               <EmptyTitle>
                  {hasAnyTask ? "Nada con estos filtros" : "Tu lista está vacía"}
               </EmptyTitle>
               <EmptyDescription>
                  {hasAnyTask
                     ? "Prueba a cambiar el estado o la fecha seleccionada."
                     : "Crea tu primera tarea y empieza a organizar el día."}
               </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
               {hasAnyTask ? (
                  <Button variant="outline" size="sm" onClick={onClearFilters}>
                     Quitar filtros
                  </Button>
               ) : (
                  <Button size="sm" onClick={onCreate}>
                     <Plus className="size-4" />
                     Nueva tarea
                  </Button>
               )}
            </EmptyContent>
         </Empty>
      )
   }

   return (
      <ul className="divide-y">
         {tasks.map((task) => (
            <li key={task.id}>
               <TaskRow
                  task={task}
                  onStatusChange={onStatusChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
               />
            </li>
         ))}
      </ul>
   )
}
