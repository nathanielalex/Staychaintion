import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">

      <main className="container mx-auto px-4 py-8">
        {/* Hero section skeleton */}
        <div className="w-full max-w-5xl mx-auto mb-16">
          <Skeleton className="h-16 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full max-w-2xl mb-8" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>

        {/* Main content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-[600px] rounded-xl" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-[300px] rounded-xl mb-8" />
            <Skeleton className="h-[200px] rounded-xl mb-8" />
            <Skeleton className="h-[150px] rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  )
}

