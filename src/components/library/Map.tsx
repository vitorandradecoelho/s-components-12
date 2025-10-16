import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

declare global {
  interface Window {
    google: any;
  }
}

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  icon?: string;
}

export interface MapPolyline {
  id: string;
  positions: [number, number][];
  color?: string;
  weight?: number;
}

export interface MapPolygon {
  id: string;
  positions: [number, number][];
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

export interface MapCircle {
  id: string;
  center: [number, number];
  radius: number;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

export interface MapProps {
  provider?: 'openstreet' | 'google';
  center?: [number, number];
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  polygons?: MapPolygon[];
  circles?: MapCircle[];
  googleMapsApiKey?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  onMapClick?: (lat: number, lng: number) => void;
  showZoomControls?: boolean;
  showFullscreenControl?: boolean;
  interactive?: boolean;
}

const GoogleMapComponent: React.FC<MapProps> = ({
  height = '400px',
  width = '100%',
}) => {
  return (
    <div 
      style={{ height, width }}
      className="flex items-center justify-center bg-muted rounded-lg"
    >
      <p className="text-muted-foreground">Google Maps em desenvolvimento</p>
    </div>
  );
};

const OpenStreetMapComponent: React.FC<MapProps> = ({
  center = [-14.235, -51.9253],
  zoom = 4,
  height = '400px',
  width = '100%',
  className = '',
  markers = [],
  polylines = [],
  polygons = [],
  circles = [],
  onMarkerClick,
  onMapClick,
  showZoomControls = true,
  interactive = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: showZoomControls,
      dragging: interactive,
      touchZoom: interactive,
      doubleClickZoom: interactive,
      scrollWheelZoom: interactive,
      boxZoom: interactive,
      keyboard: interactive,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    if (onMapClick) {
      map.on('click', (e: L.LeafletMouseEvent) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
      });
    }

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    markers.forEach((marker) => {
      const leafletMarker = L.marker([marker.lat, marker.lng]).addTo(map);
      
      if (marker.title || marker.description) {
        const popupContent = `
          ${marker.title ? `<strong>${marker.title}</strong>` : ''}
          ${marker.description ? `<p>${marker.description}</p>` : ''}
        `;
        leafletMarker.bindPopup(popupContent);
      }
      
      if (onMarkerClick) {
        leafletMarker.on('click', () => onMarkerClick(marker));
      }
    });

    polylines.forEach((polyline) => {
      L.polyline(polyline.positions, {
        color: polyline.color || '#3388ff',
        weight: polyline.weight || 3
      }).addTo(map);
    });

    polygons.forEach((polygon) => {
      L.polygon(polygon.positions, {
        color: polygon.color || '#3388ff',
        fillColor: polygon.fillColor || '#3388ff',
        fillOpacity: polygon.fillOpacity || 0.2
      }).addTo(map);
    });

    circles.forEach((circle) => {
      L.circle(circle.center, {
        radius: circle.radius,
        color: circle.color || '#3388ff',
        fillColor: circle.fillColor || '#3388ff',
        fillOpacity: circle.fillOpacity || 0.2
      }).addTo(map);
    });
  }, [markers, polylines, polygons, circles, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width }} 
      className={className}
    />
  );
};

export const Map: React.FC<MapProps> = ({
  provider = 'openstreet',
  googleMapsApiKey,
  ...props
}) => {
  try {
    if (provider === 'google') {
      if (!googleMapsApiKey) {
        return (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <p className="text-muted-foreground">Google Maps API Key é necessária</p>
          </div>
        );
      }
      return <GoogleMapComponent {...props} />;
    }

    return <OpenStreetMapComponent {...props} />;
  } catch (error) {
    console.error('Error in Map component:', error);
    return (
      <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
        <p className="text-muted-foreground">Erro ao carregar mapa: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
      </div>
    );
  }
};

export default Map;
