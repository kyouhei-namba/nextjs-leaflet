import { useState, useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ImageOverlay,
  Polygon,
  Rectangle,
  useMapEvent,
} from 'react-leaflet'
import { CRS, LatLngBounds } from 'leaflet'
import MapResetButton from '../components/MapResetButton'

// map.png 2253*1200

export default function Map() {
  const map = {
    url: '/map.png',
    width: 2253,
    height: 1200,
    center: {
      y: 600,
      x: 1126,
    },
  }
  const bounds = new LatLngBounds([0, 0], [map.height, map.width])

  const seatmaps = [
    {
      id: 1,
      isReserve: true,
      position: [
        [875, 1140],
        [840, 1090],
      ],
    },
    {
      id: 2,
      isReserve: false,
      position: [
        [840, 1200],
        [875, 1150],
      ],
    },
    {
      id: 3,
      isReserve: false,
      position: [
        [840, 1260],
        [875, 1210],
      ],
    },
  ]

  const handleClick = (id) => {
    console.log(`id: ${id} clicked`)
  }

  return (
    <MapContainer
      center={[map.center.y, map.center.x]}
      zoom={0}
      style={{ height: '100vh' }}
      crs={CRS.Simple}>
      <ImageOverlay url={map.url} bounds={bounds} opacity={0.5}>
        {seatmaps.map((map) => (
          <Rectangle
            bounds={map.position}
            pathOptions={{
              fillColor: map.isReserve ? 'gray' : '#FD8D3C',
              fillOpacity: 0.5,
              weight: 2,
              opacity: 0.5,
              dashArray: 3,
              color: 'purple',
            }}
            eventHandlers={{
              click: () => {
                handleClick(map.id)
              },
              mouseover: (e) => {
                if (map.isReserve) return
                const layer = e.target
                layer.setStyle({
                  dashArray: '',
                  fillColor: '#FD8D3C',
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: 'purple',
                })
              },
              mouseout: (e) => {
                if (map.isReserve) return
                const layer = e.target
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: '3',
                  color: 'purple',
                  fillColor: '#FD8D3C',
                })
              },
            }}
            key={map.id}
          />
        ))}
      </ImageOverlay>
      <MapResetButton center={map.center} />
    </MapContainer>
  )
}
