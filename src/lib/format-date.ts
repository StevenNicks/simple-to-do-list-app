export function formatDate(dateStr: string): string {
   const date = new Date(dateStr + "T00:00:00") // forzamos medianoche local
   return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
   })
}