"use client"

import { TriangleAlert } from "lucide-react"

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteTaskDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   taskTitle?: string
   onConfirm: () => void
}

export function DeleteTaskDialog({
   open,
   onOpenChange,
   taskTitle,
   onConfirm,
}: DeleteTaskDialogProps) {
   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogMedia className="size-10 rounded-full bg-destructive/10 text-destructive">
                  <TriangleAlert className="size-5" />
               </AlertDialogMedia>
               <AlertDialogTitle>¿Eliminar esta tarea?</AlertDialogTitle>
               <AlertDialogDescription>
                  {taskTitle ? (
                     <>
                        Se eliminará{" "}
                        <span className="font-medium text-foreground">{taskTitle}</span>. Podrás
                        deshacerlo desde la notificación.
                     </>
                  ) : (
                     "Esta acción se puede deshacer desde la notificación."
                  )}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <AlertDialogAction variant="destructive" onClick={onConfirm}>
                  Eliminar
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
