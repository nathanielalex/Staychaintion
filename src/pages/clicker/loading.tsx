import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 text-blue-400 animate-spin" />
        <p className="text-blue-300 text-lg font-medium">Loading Clicker Game...</p>
      </div>
    </div>
  )
}

