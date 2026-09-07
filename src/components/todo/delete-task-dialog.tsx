"use client"

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
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
         <AlertDialogContent size="sm">
            <AlertDialogHeader>
               <AlertDialogTitle>¿Eliminar esta tarea?</AlertDialogTitle>
               <AlertDialogDescription>
                  {taskTitle ? (
                     <>
                        Se eliminará <span className="font-medium text-foreground">{taskTitle}</span>.
                        Podrás deshacerlo desde la notificación.
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
