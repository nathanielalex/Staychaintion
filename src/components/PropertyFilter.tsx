import { PropertyFilterContext } from '@/context/PropertyFilterContext';
import React, { useContext } from 'react';
import { Input } from './ui/input';

function PropertyFilter() {

  const { filter, setFilter } = useContext(PropertyFilterContext);

  return (
    <>
      <div className="max-w-full flex border rounded-full h-fit my-4 py-2 px-8">
        <Input
          className="max-w-64"
          placeholder="Property Name..."
          onKeyDown={(e) => {
            console.log(e.key)
            if(e.key == "Enter"){
              console.log(e.currentTarget.value)
              setFilter(e.currentTarget.value)
            }
          }}
        />
      </div>

      {filter && <h2 className="text-xl mb-4">Filter results for {filter}...</h2>}
    </>
  );
}

export default PropertyFilter;
