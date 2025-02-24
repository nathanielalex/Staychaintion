import PropertyCard from '@/components/PropertyCard';
import PropertyGrid from '@/components/PropertyGrid';
import { Button } from '@/components/ui/button'
import { Property } from '@/types';
import React from 'react'

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

const properties = [
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
  dummy,
]

function PropertyListPage() {
  return (
    <div className='h-fit w-full'>
      <PropertyGrid properties={properties}/>
    </div>
  )
}

export default PropertyListPage