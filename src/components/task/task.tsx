import { cn } from "@/lib/utils"
import { FileText, Ellipsis, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { TaskOptions } from '@/components/task-options'
import { TaskProps, TaskStatus } from "./task.types"

const statusClassMap: Record<TaskStatus, string> = {
   "In process": "bg-[oklch(0.852_0.199_91.936)]/50",
   "Completed": "bg-[oklch(0.648_0.2_131.684)]/50",
   "Delete": "bg-[oklch(0.577_0.245_27.325)]/50",
}

export function Task({
   title,
   date,
   description,
   status,
   nested,
}: TaskProps) {
   return (
      <div className="space-y-3">
         <div
            className={cn(
               "flex flex-col gap-3 rounded-lg px-3 py-3 mx-4",
               statusClassMap[status],
               nested && "ml-6"
            )}
         >
            <div className="flex items-center gap-3 ">
               <Button
                  variant="outline"
                  className="flex size-8 items-center justify-center rounded-md"
               >
                  <FileText className="size-4" />
               </Button>

               <div className="flex-1">
                  <p className="text-sm font-medium">{title}</p>
                  <p className={cn("text-xs text-foreground")}>
                     {date}
                  </p>

               </div>

               <TaskOptions />
            </div>
            <div>
               <p className={cn("text-xs text-foreground/80 text-justify")}>
                  {description}
               </p>
            </div>
         </div>
         <Separator />
      </div>
   )
}