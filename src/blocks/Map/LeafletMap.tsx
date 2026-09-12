'use client'

import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import React, { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'

export type LeafletMapProps = {
  latitude: number
  longitude: number
  zoom: number
  markerLabel?: string | null
  ariaLabel: string
}

/**
 * A marker drawn as a `divIcon` rather than an image.
 *
 * Leaflet's default marker resolves its icon from a relative image path that
 * bundlers rewrite, which is the usual cause of the missing-marker bug. An
 * inline SVG sidesteps that entirely and lets the pin use the theme's colours.
 */
const buildIcon = () =>
  L.divIcon({
    className: 'prodeprod-marker',
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -34],
    html: `
      <svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 9.94 12.29 22.86 12.813 23.404a1.65 1.65 0 0 0 2.374 0C15.71 36.86 28 23.94 28 14 28 6.268 21.732 0 14 0Z" fill="var(--marker-fill)"/>
        <circle cx="14" cy="14" r="5" fill="var(--marker-dot)"/>
      </svg>
    `,
  })

export const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  zoom,
  markerLabel,
  ariaLabel,
}) => {
  const icon = useMemo(() => buildIcon(), [])
  const center = useMemo<[number, number]>(() => [latitude, longitude], [latitude, longitude])

  return (
    <MapContainer
      aria-label={ariaLabel}
      attributionControl
      center={center}
      className="h-full w-full"
      scrollWheelZoom={false}
      zoom={zoom}
      zoomControl={false}
    >
      {/*
        OpenStreetMap's own tiles: the only genuinely key-less raster basemap
        left. CARTO's Positron, which this used first, now returns
        "API KEY REQUIRED" tiles. Colour is removed by the `grayscale` filter
        on the tile pane in the parent stylesheet rather than by the provider.

        OSM's tile usage policy covers a company site's traffic; if this ever
        serves heavy volume, move to a paid provider or self-host.
      */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      <Marker icon={icon} position={center}>
        {markerLabel ? <Popup>{markerLabel}</Popup> : null}
      </Marker>
    </MapContainer>
  )
}

export default LeafletMap
