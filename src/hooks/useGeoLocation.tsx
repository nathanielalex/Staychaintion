import React, { useEffect, useState } from 'react'

type GeoLocation = {
  latitude: number,
  longitude: number
}

function useGeoLocation() {
  const [location, setLocation] = useState<GeoLocation>();

  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  })

  return location;
}

export default useGeoLocation