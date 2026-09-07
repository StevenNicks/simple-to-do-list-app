"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import type { DateFilterValue, StatusFilter, Task, TaskStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { formatLongDate, toISODate } from "@/lib/format-date"
import { matchesDateFilter } from "@/lib/date-filter"
import { ModeSwitcher } from "@/components/mode-switcher"
import { DateFilter } from "@/components/todo/date-filter"
import { DeleteTaskDialog } from "@/components/todo/delete-task-dialog"
import { TaskFormDialog } from "@/components/todo/task-form-dialog"
import { TaskList } from "@/components/todo/task-list"
import { useTasks, type TaskDraft } from "@/hooks/use-tasks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const STATUS_RANK: Record<Task["status"], number> = {
   todo: 0,
   "in-progress": 1,
   done: 2,
}

const FILTER_TABS: { value: StatusFilter; label: string }[] = [
   { value: "all", label: "Todas" },
   { value: "todo", label: "Pendiente" },
   { value: "in-progress", label: "En curso" },
   { value: "done", label: "Hechas" },
]

export function TodoApp() {
   const { tasks, mounted, addTask, updateTask, deleteTask, restoreTask, setStatus } =
      useTasks()

   const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all")
   const [dateFilter, setDateFilter] = React.useState<DateFilterValue | null>(null)

   const [formOpen, setFormOpen] = React.useState(false)
   const [editingTask, setEditingTask] = React.useState<Task | null>(null)
   const [deleteTarget, setDeleteTarget] = React.useState<Task | null>(null)

   const counts = React.useMemo(() => {
      const base = { all: tasks.length, todo: 0, "in-progress": 0, done: 0 }
      for (const task of tasks) base[task.status] += 1
      return base
   }, [tasks])

   const visibleTasks = React.useMemo(() => {
      return tasks
         .filter((task) => statusFilter === "all" || task.status === statusFilter)
         .filter((task) => matchesDateFilter(task.date, dateFilter))
         .sort((a, b) => {
            if (STATUS_RANK[a.status] !== STATUS_RANK[b.status]) {
               return STATUS_RANK[a.status] - STATUS_RANK[b.status]
            }
            if (a.date !== b.date) return a.date < b.date ? -1 : 1
            return b.createdAt - a.createdAt
         })
   }, [tasks, statusFilter, dateFilter])

   const doneCount = counts.done
   const progress = tasks.length ? Math.round((doneCount / tasks.length) * 100) : 0

   function openCreate() {
      setEditingTask(null)
      setFormOpen(true)
   }

   function openEdit(task: Task) {
      setEditingTask(task)
      setFormOpen(true)
   }

   function handleSubmit(draft: TaskDraft) {
      if (editingTask) {
         updateTask(editingTask.id, draft)
         toast.success("Tarea actualizada")
      } else {
         addTask(draft)
         toast.success("Tarea creada")
      }
   }

   function handleStatusChange(task: Task, status: TaskStatus) {
      if (status === task.status) return
      setStatus(task.id, status)
   }

   function confirmDelete() {
      const target = deleteTarget
      if (!target) return
      deleteTask(target.id)
      setDeleteTarget(null)
      toast("Tarea eliminada", {
         description: target.title,
         action: {
            label: "Deshacer",
            onClick: () => restoreTask(target),
         },
      })
   }

   function clearFilters() {
      setStatusFilter("all")
      setDateFilter(null)
   }

   return (
      <div className="flex w-full max-w-lg flex-col">
         <Card className="grid max-h-[calc(100svh-2rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden py-0 shadow-xl sm:max-h-[calc(100svh-5rem)]">
            <CardHeader className="shrink-0 gap-4 border-b !p-4 [.border-b]:!pb-4">
               <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-0.5">
                     <h1 className="text-base leading-none font-semibold tracking-tight">
                        Tareas
                     </h1>
                     <p className="truncate text-sm text-muted-foreground">
                        {formatLongDate(toISODate(new Date()))}
                     </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                     <ModeSwitcher />
                     <Button
                        size="sm"
                        onClick={openCreate}
                        className="max-sm:size-9 max-sm:p-0"
                     >
                        <Plus className="size-4" />
                        <span className="max-sm:sr-only">Nueva tarea</span>
                     </Button>
                  </div>
               </div>

               <DateFilter value={dateFilter} onChange={setDateFilter} />

               <Tabs
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
               >
                  <TabsList className="w-full">
                     {FILTER_TABS.map((tab) => (
                        <TabsTrigger
                           key={tab.value}
                           value={tab.value}
                           className="min-w-0 gap-1 px-1.5 text-xs data-[state=inactive]:text-muted-foreground"
                        >
                           <span className="truncate">{tab.label}</span>
                           <span className="shrink-0 tabular-nums opacity-50">
                              {counts[tab.value]}
                           </span>
                        </TabsTrigger>
                     ))}
                  </TabsList>
               </Tabs>
            </CardHeader>

            <CardContent className="min-h-0 overflow-hidden p-0">
               {!mounted ? (
                  <div className="space-y-4 p-4">
                     {[0, 1, 2].map((i) => (
                        <div key={i} className="flex gap-3">
                           <Skeleton className="size-[18px] rounded-[4px]" />
                           <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-2/3" />
                              <Skeleton className="h-3 w-full" />
                              <Skeleton className="h-5 w-24 rounded-full" />
                           </div>
                        </div>
                     ))}
                  </div>
               ) : (
                  <ScrollArea type="auto" className="h-full">
                     <TaskList
                        tasks={visibleTasks}
                        hasAnyTask={tasks.length > 0}
                        onCreate={openCreate}
                        onClearFilters={clearFilters}
                        onStatusChange={handleStatusChange}
                        onEdit={openEdit}
                        onDelete={setDeleteTarget}
                     />
                  </ScrollArea>
               )}
            </CardContent>

            <CardFooter className="shrink-0 flex-col items-stretch gap-2 border-t p-4">
               <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                     {doneCount} de {tasks.length} completadas
                  </span>
                  <span className="tabular-nums">{progress}%</span>
               </div>
               <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                     className={cn(
                        "h-full rounded-full bg-primary transition-[width] duration-500",
                        progress === 0 && "opacity-0"
                     )}
                     style={{ width: `${progress}%` }}
                  />
               </div>
            </CardFooter>
         </Card>

         <TaskFormDialog
            open={formOpen}
            onOpenChange={setFormOpen}
            task={editingTask}
            onSubmit={handleSubmit}
         />
         <DeleteTaskDialog
            open={deleteTarget !== null}
            onOpenChange={(open) => !open && setDeleteTarget(null)}
            taskTitle={deleteTarget?.title}
            onConfirm={confirmDelete}
         />
      </div>
   )
}
