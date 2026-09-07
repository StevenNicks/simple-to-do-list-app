"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

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
      <Button
         variant="outline"
         size="icon"
         onClick={toggleTheme}
         aria-label="Cambiar tema"
         className="size-9 sm:size-8"
      >
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
   )
}