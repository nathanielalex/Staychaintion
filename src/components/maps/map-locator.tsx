import useGeoLocation from '@/hooks/useGeoLocation';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useSearchParams } from 'react-router-dom';

// Extend Leaflet's types for leaflet-control-geocoder
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
      geocode(
        query: string,
        callback: (
          results: { center: L.LatLng; name: string; bbox: L.LatLngBounds }[],
        ) => void,
      ): void;
      on(
        event: 'markgeocode',
        callback: (e: {
          geocode: { center: L.LatLng; name: string; bbox: L.LatLngBounds };
        }) => void,
      ): this;
    }
  }
}

export default function MapLocator() {
  const map = useMap();
  if (!map) return <></>;

  const location = useGeoLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.get('search') ?? '');

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
    if (!searchQuery) return;

    const geocoder = (L.Control as any).Geocoder.nominatim();
    geocoder.geocode(searchQuery, (results: any) => {
      if (results.length > 0) {
        const { center, name, bbox } = results[0];
        map.fitBounds(bbox);
      } else {
        alert('Location not found');
      }
    });
  }, [searchQuery]);

  // useEffect(() => {
  //   let geocoder = (L.Control as any).Geocoder.nominatim();

  //   L.Control.geocoder({
  //     query: '',
  //     placeholder: 'Search here...',
  //     defaultMarkGeocode: false,
  //     geocoder,
  //   })
  //     .on('markgeocode', (e) => {
  //       map.fitBounds(e.geocode.bbox);
  //     })
  //     .addTo(map);
  // }, []);

  return <></>;
}
