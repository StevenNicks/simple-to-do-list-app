"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { TaskStatus } from "@/components/task/task.types"

export function AddTask() {
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState("")
   const [status, setStatus] = useState("")

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      const newTask = {
         title,
         description,
         status,
         date: new Date().toISOString().split("T")[0]
      }

      console.log("TASK:", newTask)

      // luego aquí conectamos API o state
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline" size="icon">
               <Plus className="text-muted-foreground" />
            </Button>
         </DialogTrigger>

         <DialogContent className="sm:max-w-105">
            <form onSubmit={handleSubmit}>
               <DialogHeader>
                  <DialogTitle>Add task</DialogTitle>
                  <DialogDescription>
                     Create a new task for your daily list.
                  </DialogDescription>
               </DialogHeader>

               <div className="grid gap-4 py-4">
                  {/* Title */}
                  <div className="grid gap-2">
                     <Label htmlFor="title">Title</Label>
                     <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        required
                     />
                  </div>

                  {/* Description */}
                  <div className="grid gap-2">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task description"
                     />
                  </div>

                  {/* Status */}
                  <div className="grid gap-2">
                     <Label>Status</Label>
                     <Select
                        value={status}
                        onValueChange={(value) => setStatus(value as TaskStatus)}
                     >
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="In process">In process</SelectItem>
                           <SelectItem value="Completed">Completed</SelectItem>
                           <SelectItem value="Delete">Delete</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add task</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   )
}
