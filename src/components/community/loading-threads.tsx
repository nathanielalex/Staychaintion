export default function LoadingThreads() {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 rounded-lg border border-border bg-white animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200" />
  
              <div className="flex-grow min-w-0">
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
  
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="h-3 bg-slate-200 rounded w-20" />
                  <div className="h-3 bg-slate-200 rounded w-24" />
                  <div className="h-3 bg-slate-200 rounded w-16" />
                  <div className="h-3 bg-slate-200 rounded w-28" />
                </div>
  
                <div className="h-4 bg-slate-200 rounded w-24 mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  