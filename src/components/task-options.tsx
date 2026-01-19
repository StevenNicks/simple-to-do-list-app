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
import { Ellipsis, Pencil  } from "lucide-react"

export function TaskOptions() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button size="icon" variant={"outline"}>
               <Ellipsis className="size-4 stroke-3" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Task options</DropdownMenuLabel>
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  Edit task
               </DropdownMenuItem>
               <DropdownMenuItem>
                  Mark task
               </DropdownMenuItem>
               <DropdownMenuItem>
                  Delete task
               </DropdownMenuItem>
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                     Change state
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                        <DropdownMenuItem>In progress</DropdownMenuItem>
                        <DropdownMenuItem>Completed</DropdownMenuItem>
                        <DropdownMenuItem>Delayed</DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuPortal>
               </DropdownMenuSub>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
