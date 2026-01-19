import { ListTodo } from "lucide-react"

import { List } from "@/components/list"
import { ModeSwitcher } from '@/components/mode-switcher'
import { GridBackground } from "@/components/grid-background"

export default function LoginPage() {
   return (
      <GridBackground>
         <div className="fixed top-4 right-4 z-50">
            <ModeSwitcher />
         </div>
         <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <List />
         </div>
      </GridBackground>
   )
}
