import { TodoApp } from "@/components/todo/todo-app"
import { GridBackground } from "@/components/grid-background"

export default function Home() {
   return (
      <GridBackground>
         <main className="flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
            <TodoApp />
         </main>
      </GridBackground>
   )
}
