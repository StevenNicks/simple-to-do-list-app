"use client"

import * as React from "react"

import type { Task, TaskStatus } from "@/lib/types"
import seedTasks from "@/data/seed-tasks.json"

const STORAGE_KEY = "todo.tasks.v1"

/**
 * `crypto.randomUUID` only exists in secure contexts (https / localhost). When
 * the app is opened over a plain-HTTP LAN IP it's undefined, so fall back.
 */
function createId(): string {
   if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
   }
   return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function readStorage(): Task[] {
   if (typeof window === "undefined") return seedTasks as Task[]
   try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return seedTasks as Task[]
      const parsed = JSON.parse(raw) as Task[]
      return Array.isArray(parsed) ? parsed : (seedTasks as Task[])
   } catch {
      return seedTasks as Task[]
   }
}

function writeStorage(tasks: Task[]) {
   try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
   } catch {
      // ignore write failures (private mode, quota, etc.)
   }
}

export interface TaskDraft {
   title: string
   description: string
   status: TaskStatus
   date: string
}

export function useTasks() {
   const [tasks, setTasks] = React.useState<Task[]>(seedTasks as Task[])
   const [mounted, setMounted] = React.useState(false)

   React.useEffect(() => {
      setTasks(readStorage())
      setMounted(true)
   }, [])

   React.useEffect(() => {
      if (mounted) writeStorage(tasks)
   }, [tasks, mounted])

   const addTask = React.useCallback((draft: TaskDraft) => {
      const task: Task = {
         ...draft,
         id: createId(),
         createdAt: Date.now(),
      }
      setTasks((prev) => [task, ...prev])
      return task
   }, [])

   const updateTask = React.useCallback((id: string, draft: TaskDraft) => {
      setTasks((prev) =>
         prev.map((task) => (task.id === id ? { ...task, ...draft } : task))
      )
   }, [])

   const deleteTask = React.useCallback((id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id))
   }, [])

   const restoreTask = React.useCallback((task: Task) => {
      setTasks((prev) =>
         prev.some((t) => t.id === task.id)
            ? prev
            : [task, ...prev].sort((a, b) => b.createdAt - a.createdAt)
      )
   }, [])

   const setStatus = React.useCallback((id: string, status: TaskStatus) => {
      setTasks((prev) =>
         prev.map((task) => (task.id === id ? { ...task, status } : task))
      )
   }, [])

   return {
      tasks,
      mounted,
      addTask,
      updateTask,
      deleteTask,
      restoreTask,
      setStatus,
   }
}
