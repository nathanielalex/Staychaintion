import useGeoLocation from '@/hooks/useGeoLocation';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapLocator() {
  const map = useMap();
  if (!map) return <></>;

  const location = useGeoLocation();

  useEffect(() => {
    if (location) {
      map.flyTo(
        {
          lat: location.latitude,
          lng: location.longitude,
        },
        map.getZoom(),
      );
    }
  }, [location]);

  return <></>;
}
