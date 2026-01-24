import React from 'react';
import Map, { Source, Layer, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapboxMap({ latitude, longitude, token }) {
  // Create a GeoJSON circle for the privacy radius (approx 0.5 miles)
  const createGeoJSONCircle = (center, radiusInKm, points = 64) => {
    const coords = {
      latitude: center.latitude,
      longitude: center.longitude,
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        },
      ],
    };
  };

  const geoJson = createGeoJSONCircle({ latitude, longitude }, 0.8); // 0.8 km ~ 0.5 miles

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative">
      <Map
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 13
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={token}
        scrollZoom={false}
      >
        <NavigationControl position="top-right" />
        
        {/* Render the privacy circle */}
        <Source id="privacy-circle" type="geojson" data={geoJson}>
          <Layer
            id="fill-layer"
            type="fill"
            paint={{
              'fill-color': '#4264fb',
              'fill-opacity': 0.2
            }}
          />
          <Layer
            id="outline-layer"
            type="line"
            paint={{
              'line-color': '#4264fb',
              'line-width': 2
            }}
          />
        </Source>
      </Map>
      
      {/* Privacy Badge */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 shadow-md border border-gray-200 z-10">
        Approximate Location
      </div>
    </div>
  );
}
