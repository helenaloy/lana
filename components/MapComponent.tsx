'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function MapComponent() {
  return <MapContent />;
}

