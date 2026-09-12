'use client'

import dynamic from 'next/dynamic'
import React from 'react'

import type { LeafletMapProps } from './LeafletMap'

/**
 * Leaflet measures the DOM on mount and has no server rendering, so the map
 * is loaded only in the browser. `ssr: false` is legal here because this file
 * is a Client Component; calling it from a Server Component would throw.
 */
const LeafletMap = dynamic(() => import('./LeafletMap').then((m) => m.LeafletMap), {
  ssr: false,
  loading: () => <div aria-hidden className="h-full w-full animate-pulse bg-muted" />,
})

export const MapCanvas: React.FC<LeafletMapProps> = (props) => <LeafletMap {...props} />

export default MapCanvas
