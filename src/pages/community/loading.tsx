export default function Loading() {
    return (
      <div className="min-h-screen bg-background animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="h-10 bg-slate-200 rounded-full w-3/4 mx-auto mb-4" />
              <div className="h-4 bg-slate-200 rounded-full w-full mx-auto mb-2" />
              <div className="h-4 bg-slate-200 rounded-full w-5/6 mx-auto mb-8" />
  
              <div className="flex justify-center gap-4 mb-12">
                <div className="h-10 bg-slate-200 rounded-full w-32" />
                <div className="h-10 bg-slate-200 rounded-full w-32" />
              </div>
  
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white/80 rounded-xl p-4 shadow-sm border border-border">
                    <div className="w-10 h-10 rounded-full bg-slate-200 mx-auto mb-2" />
                    <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto mb-1" />
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl p-6 border border-border">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="h-6 bg-slate-200 rounded w-20" />
                    <div className="h-4 bg-slate-200 rounded w-24" />
                    <div className="h-3 bg-slate-200 rounded w-16" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
  
          {/* Forum Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar Skeleton */}
            <div className="lg:col-span-1 space-y-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-border">
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-4" />
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center p-3 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-slate-200 mr-3" />
                        <div className="flex-grow">
                          <div className="h-4 bg-slate-200 rounded w-3/4 mb-1" />
                          <div className="h-3 bg-slate-200 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Main Content Area Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Skeleton */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="h-10 bg-slate-200 rounded-md w-full" />
                </div>
                <div className="h-10 bg-slate-200 rounded-md w-32" />
              </div>
  
              {/* Content Boxes Skeleton */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-border">
                  <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="p-4 rounded-lg border border-border">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200" />
                          <div className="flex-grow">
                            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                            <div className="h-3 bg-slate-200 rounded w-1/4" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  