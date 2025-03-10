import PropertyCard from '@/components/PropertyCard';
import PropertyFilter from '@/components/PropertyFilter';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyCardSkeleton from '@/components/skeleton/PropertyCardSkeleton';
import PropertyGridSkeleton from '@/components/skeleton/PropertyGridSkeleton';
import { Button } from '@/components/ui/button'
import { PropertyFilterContext } from '@/context/PropertyFilterContext';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
import { delay } from '@/lib/utils';
import { Property } from '@/types';
import React, { useContext, useEffect, useState } from 'react'

const dummy: Property = {
  uuid: '1234',
  title: 'Tambon Huai Sat Yai, Thailand',

  thumbnail:
    'https://a0.muscache.com/im/pictures/miso/Hosting-1281034989788919425/original/18c6bb05-c2d4-49ba-9df4-36d11ca70b6d.jpeg?im_w=720&im_format=avif&im_origin=fuzzy',
  images: [],

  location: 'Tambon Huai Sat Yai, Chang Wat Prachuap Khiri Khan, Thailand',

  price: 1000000,
  currency: 'IDR',

  rating: 4.98,
  favorite: false,
};

// create 10 dummies
const dummies: Property[] = Array.from({length: 20}).map(_ => dummy)

const getProperties = async () => {
  await delay(()=>{}, 3000);
  return dummies;
}

function PropertyListPage() {

  const {filter} = useContext(PropertyFilterContext);
  const [properties, setProperties] = useState<Property[]>(dummies);
  const [isLoading, setLoading] = useState(false);
  const isBottom = useScrollToBottom();

  useEffect(()=>{
    if(isBottom){
      setLoading(true)
      getProperties()
      .then((data)=>{
        setProperties([...properties, ...data])
      })
      .finally(()=>{
        setLoading(false);
      })
    }
  }, [isBottom])

  return (
    <div className='h-fit w-full'>
      <PropertyFilter/>
      <PropertyGrid properties={properties}/>
      {isLoading && <PropertyGridSkeleton className='mt-4'/>}
    </div>
  )
}

export default PropertyListPage