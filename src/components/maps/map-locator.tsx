import useGeoLocation from '@/hooks/useGeoLocation';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

import L from 'leaflet';
import 'leaflet-control-geocoder';

declare module 'leaflet' {
  namespace Control {
      function geocoder(options?: GeocoderOptions): Geocoder;
      
      interface GeocoderOptions {
          defaultMarkGeocode?: boolean;
          query?: string;
          placeholder?: string;
          geocoder?: any;
      }

      interface Geocoder extends L.Control {
          on(event: 'markgeocode', callback: (e: { geocode: { center: L.LatLng, name: string, bbox: L.LatLngBounds } }) => void): this;
      }
  }
}

const customIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapLocator() {
  const map = useMap();
  if (!map) return <></>;

  const location = useGeoLocation();
  const search = 'Tangerang';

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

  useEffect(() => {
    let geocoder = (L.Control as any).Geocoder.nominatim();
    
    if (typeof URLSearchParams !== "undefined" && search) {
        const params = new URLSearchParams(search);
        const geocoderString = params.get("geocoder");
        if (geocoderString && (L.Control as any).Geocoder[geocoderString]) {
            geocoder = (L.Control as any).Geocoder[geocoderString]();
        } else if (geocoderString) {
            console.warn("Unsupported geocoder", geocoderString);
        }
    }

    L.Control.geocoder({
        query: "",
        placeholder: "Search here...",
        defaultMarkGeocode: false,
        geocoder
    })
    .on("markgeocode", (e) => {
        map.fitBounds(e.geocode.bbox);
    })
    .addTo(map);
    
}, [map]);

  return <></>;
}
