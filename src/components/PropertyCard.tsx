import React from 'react';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Property } from '@/types';
import { formatPrice } from '@/lib/formatString';
import { Star } from 'lucide-react';

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

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="w-full">

      <CardHeader className="p-0 w-full h-full">
        <AspectRatio ratio={1/1} className="overflow-hidden rounded-lg flex place-items-center">
          <img src={property.thumbnail} alt="" className="object-cover"/>
        </AspectRatio>
      </CardHeader>

      <CardFooter className="px-2 pt-2 flex gap-8 justify-start">
        <div className='w-3/4'>
          <h2>{property.title}</h2>
          <h3 className='font-semibold'>{formatPrice(property.price)}</h3>
        </div>
        <div className="flex place-items-center gap-1">
          <Star fill="black" className="w-4 h-4"/>
          <h2>{property.rating.toPrecision(3)}</h2>
        </div>
      </CardFooter>
      
    </Card>
  );
}

export default PropertyCard;
