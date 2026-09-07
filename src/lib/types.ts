export type TaskStatus =
   | "todo"
   | "blocked"
   | "in-progress"
   | "done"
   | "cancelled"

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

/** Date filter for the task list. `null` means "all dates". */
export type DateFilterValue =
   | { mode: "day"; date: string }
   | { mode: "range"; from: string; to: string }
   | { mode: "month"; year: number; month: number }
   | { mode: "year"; year: number }
