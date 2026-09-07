import { TodoApp } from "@/components/todo/todo-app"
import { GridBackground } from "@/components/grid-background"

export default function Home() {
   return (
      <GridBackground>
         <main className="flex min-h-svh flex-col items-center justify-start px-4 pt-6 pb-2 md:px-10 md:pt-16 md:pb-4">
            <TodoApp />
         </main>
      </GridBackground>
   )
}
