export type TaskStatus = "todo" | "in-progress" | "done"

export interface Task {
   id: string
   title: string
   description: string
   status: TaskStatus
   /** ISO date, yyyy-MM-dd */
   date: string
   createdAt: number
}

export type StatusFilter = TaskStatus | "all"
