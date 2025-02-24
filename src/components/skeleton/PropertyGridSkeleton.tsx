import React from 'react'
import PropertyCardSkeleton from './PropertyCardSkeleton'
import { cn } from '@/lib/utils'

function PropertyGridSkeleton({length = 8, className}:{length?:number, className?:string}) {
  return (
    <div className={cn("w-full h-full grid items-start grid-cols-5 gap-4", className)}>
      {Array.from({length}).map((_) => 
        <PropertyCardSkeleton/>
      )}
    </div>
  )
}

export default PropertyGridSkeleton