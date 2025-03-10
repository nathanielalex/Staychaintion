"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import MarkerClusterGroup from "react-leaflet-cluster"
import { Property } from "@/declarations/Property_backend/Property_backend.did"

// Fix Leaflet icon issues
const createCustomIcon = (selected: boolean) => {
  return new L.Icon({
    iconUrl: selected ? "/marker-selected.svg" : "/marker.svg",
    iconSize: selected ? [38, 38] : [32, 32],
    iconAnchor: selected ? [19, 38] : [16, 32],
    popupAnchor: [0, -32],
  })
}

// Define property type
// interface Property {
//   id: number
//   title: string
//   location: {
//     lat: number
//     lng: number
//     address: string
//   }
//   price: number
//   image: string
// }

interface PropertyMapProps {
  properties: Property[]
  selectedProperty: string | null
  setSelectedProperty: (id: string | null) => void
  center: [number, number]
  zoom: number
  setCenter: (center: [number, number]) => void
  setZoom: (zoom: number) => void
}

// Map controller component to handle map events and updates
function MapController({
  selectedProperty,
  properties,
  setSelectedProperty,
  setCenter,
  setZoom,
}: {
  selectedProperty: string | null
  properties: Property[]
  setSelectedProperty: (id: string | null) => void
  setCenter: (center: [number, number]) => void
  setZoom: (zoom: number) => void
}) {
  const map = useMap()

  // Update map when selected property changes
  useEffect(() => {
    if (selectedProperty) {
      const property = properties.find((p) => p.id === selectedProperty)
      if (property) {
        map.setView([property.latitude, property.longitude], 14, {
          animate: true,
          duration: 1,
        })
      }
    }

    // Fit map to show all properties
    if (properties.length > 0) {
      const bounds = L.latLngBounds(properties.map((p) => [p.latitude, p.longitude]))
      map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 14,
      animate: true,
      duration: 1,
      })
    }

  }, [selectedProperty, properties, map])

  // Track map movements
  useMapEvents({
    moveend: () => {
      const center = map.getCenter()
      setCenter([center.lat, center.lng])
      setZoom(map.getZoom())
    },
    click: () => {
      setSelectedProperty(null)
    },
  })

  return null
}

export default function PropertyMap({
  properties,
  selectedProperty,
  setSelectedProperty,
  center,
  zoom,
  setCenter,
  setZoom,
}: PropertyMapProps) {
  // Create marker refs to access them later
  const markerRefs = useRef<Record<string, L.Marker>>({})

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} zoomControl={false} className="z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController
        selectedProperty={selectedProperty}
        properties={properties}
        setSelectedProperty={setSelectedProperty}
        setCenter={setCenter}
        setZoom={setZoom}
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={(cluster: { getChildCount: () => any }) => {
          return L.divIcon({
            html: `<div class="cluster-marker">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: L.point(40, 40, true),
          })
        }}
      >
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createCustomIcon(selectedProperty === property.id)}
            eventHandlers={{
              click: () => {
                setSelectedProperty(property.id)
              },
            }}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[property.id] = ref
              }
            }}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

