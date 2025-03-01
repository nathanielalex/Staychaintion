import React from 'react'
import { Card, CardFooter, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { Star } from 'lucide-react'


function PropertyCardSkeleton() {
  return (
    <Card className="w-full h-fit">
      <CardHeader className="p-0 w-full h-auto aspect-square">
        <Skeleton className='w-full h-full'/>
      </CardHeader>

      <CardFooter className="px-2 pt-2 flex gap-8 justify-start">
        <div className='w-full'>
            <Skeleton className='w-full h-5'/>
            <Skeleton className='w-3/4 h-4 mt-2'/>
          </div>
          <div className="flex place-items-center gap-1">
            <Star fill="black" className="w-4 h-4"/>
            <Skeleton className='w-10 h-4'/>
          </div>
      </CardFooter>
    </Card>
  )
}

export default PropertyCardSkeleton