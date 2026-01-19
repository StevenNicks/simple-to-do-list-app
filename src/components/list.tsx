"use client"

import { useState } from "react"
import tasks from "@/data/tasks.json"
import { formatDate } from "@/lib/format-date"
import { Task } from '@/components/task/task'
import { TaskByDate } from '@/components/tasks-by-date'
import { AddTask } from '@/components/add-task'

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { TaskStatus } from "@/components/task/task.types"

interface TaskData {
   id: number
   title: string
   description: string
   date: string
   status: TaskStatus
}

export function List() {
   // Casteamos una sola vez la data local
   const typedTasks = tasks as TaskData[]

   // Inicializamos con la fecha de hoy
   const today = new Date()
   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

   // Filtrado de tareas según la fecha seleccionada
   const filteredTasks = selectedDate
      ? typedTasks.filter(task =>
         task.date === selectedDate.toISOString().split('T')[0]
      )
      : typedTasks

   return (
      <div className="w-full max-w-xl">
         <Card className="rounded-xl shadow-xl/30 py-3 gap-0">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
               <CardTitle className="text-base font-semibold">
                  Daily to-do list
               </CardTitle>
               <CardAction className="flex items-center gap-3">
                  <TaskByDate
                     selectedDate={selectedDate}
                     onDateChange={setSelectedDate}
                  />
                  {selectedDate && (
                     <Button
                        variant="default"
                        onClick={() => setSelectedDate(undefined)}
                     >
                        View all
                     </Button>
                  )}
                  <AddTask />
               </CardAction>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-3 py-3 px-0">
               {filteredTasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                     No hay tareas para esta fecha
                  </p>
               ) : (
                  filteredTasks.map(task => (
                     <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        date={formatDate(task.date)}
                        status={task.status}
                     />
                  ))
               )}
            </CardContent>
         </Card>
      </div>
   )
}