"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"

export function ModeSwitcher() {
   const { theme, setTheme } = useTheme()

   const toggleTheme = React.useCallback(() => {
      setTheme(theme === "dark" ? "light" : "dark")
   }, [theme, setTheme])

   React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         const isMac = navigator.platform.toLowerCase().includes("mac")
         const modifierPressed = isMac ? e.metaKey : e.ctrlKey

         if (modifierPressed && e.key.toLowerCase() === "m") {
            e.preventDefault()
            toggleTheme()
         }
      }

      window.addEventListener("keydown", handler)
      return () => window.removeEventListener("keydown", handler)
   }, [toggleTheme])

   return (
      <TooltipProvider delayDuration={0}>
         <Tooltip >
            <TooltipTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
               >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <span className="flex items-center gap-2">
                  Cambiar tema
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                     Ctrl
                  </kbd>
                  +
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                     M
                  </kbd>
               </span>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}