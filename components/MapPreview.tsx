'use client';

import dynamic from 'next/dynamic';

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-gray-100">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function MapPreview() {
  return (
    <div className="h-[300px] w-full overflow-hidden rounded-lg shadow-lg">
      <MapContent />
    </div>
  );
}

