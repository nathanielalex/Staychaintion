import { Property } from '@/types'
import PropertyCard from './PropertyCard'

function PropertyGrid({properties}:{properties:Property[]}) {
  return (
    <div className="w-full h-full grid items-start grid-cols-5 gap-4">
      {properties.map((item) => 
        <PropertyCard property={item}/>
      )}
    </div>
  )
}

export default PropertyGrid