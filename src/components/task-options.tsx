import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X, Pencil } from "lucide-react"

export function TaskOptions() {
   return (
      <div className="flex items-center gap-3">
         <Button
            variant="outline"
            size="icon"
         >
            <Pencil className="size-4" />
         </Button>
         <Button
            variant="destructive"
            size="icon"
         >
            <X className="stroke-3 size-4" />
         </Button>
      </div>
   )
}
