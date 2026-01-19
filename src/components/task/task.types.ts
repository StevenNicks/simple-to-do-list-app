// task/task.types.ts
export type TaskStatus = "In process" | "Completed" | "Delete"

export interface TaskProps {
   title: string
   description: string
   date: string
   status: TaskStatus
}
