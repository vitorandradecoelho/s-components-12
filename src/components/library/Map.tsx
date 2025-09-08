import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Circle, useMap } from 'react-leaflet';
import { Wrapper } from '@googlemaps/react-wrapper';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Declarações de tipos do Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Fix for default markers in Leaflet
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

// Google Maps Component
const GoogleMapComponent: React.FC<MapProps> = ({
  center = [-14.235, -51.9253],
  zoom = 4,
  height = '400px',
  width = '100%',
  markers = [],
  onMarkerClick,
  onMapClick,
  showZoomControls = true,
  interactive = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: center[0], lng: center[1] },
      zoom,
      zoomControl: showZoomControls,
      disableDefaultUI: !interactive,
    });

    setMap(mapInstance);

    if (onMapClick) {
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          onMapClick(e.latLng.lat(), e.latLng.lng());
        }
      });
    }

    return () => {
      google.maps.event.clearInstanceListeners(mapInstance);
    };
  }, [center, zoom, onMapClick, showZoomControls, interactive]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach((marker) => {
      const googleMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map,
        title: marker.title,
      });

      if (marker.description || onMarkerClick) {
        const infoWindow = new google.maps.InfoWindow({
          content: marker.description || marker.title,
        });

        googleMarker.addListener('click', () => {
          if (onMarkerClick) {
            onMarkerClick(marker);
          }
          if (marker.description) {
            infoWindow.open(map, googleMarker);
          }
        });
      }
    });
  }, [map, markers, onMarkerClick]);

  return <div ref={mapRef} style={{ height, width }} />;
};

// OpenStreetMap Component
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
  const mapStyle = {
    height,
    width,
  };

  const MapEvents = () => {
    const map = useMap();
    
    useEffect(() => {
      if (onMapClick) {
        const handleClick = (e: L.LeafletMouseEvent) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        };
        
        map.on('click', handleClick);
        return () => {
          map.off('click', handleClick);
        };
      }
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={mapStyle}
      className={className}
      zoomControl={showZoomControls}
      dragging={interactive}
      touchZoom={interactive}
      doubleClickZoom={interactive}
      scrollWheelZoom={interactive}
      boxZoom={interactive}
      keyboard={interactive}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapEvents />
      
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          eventHandlers={{
            click: () => onMarkerClick?.(marker),
          }}
        >
          {(marker.title || marker.description) && (
            <Popup>
              {marker.title && <strong>{marker.title}</strong>}
              {marker.description && <p>{marker.description}</p>}
            </Popup>
          )}
        </Marker>
      ))}
      
      {polylines.map((polyline) => (
        <Polyline
          key={polyline.id}
          positions={polyline.positions}
          color={polyline.color || '#3388ff'}
          weight={polyline.weight || 3}
        />
      ))}
      
      {polygons.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={polygon.positions}
          color={polygon.color || '#3388ff'}
          fillColor={polygon.fillColor || '#3388ff'}
          fillOpacity={polygon.fillOpacity || 0.2}
        />
      ))}
      
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          center={circle.center}
          radius={circle.radius}
          color={circle.color || '#3388ff'}
          fillColor={circle.fillColor || '#3388ff'}
          fillOpacity={circle.fillOpacity || 0.2}
        />
      ))}
    </MapContainer>
  );
};

export const Map: React.FC<MapProps> = ({
  provider = 'openstreet',
  googleMapsApiKey,
  ...props
}) => {
  console.log('Map component rendering with provider:', provider);
  
  try {
    if (provider === 'google') {
      if (!googleMapsApiKey) {
        return (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <p className="text-muted-foreground">Google Maps API Key é necessária</p>
          </div>
        );
      }

      return (
        <Wrapper apiKey={googleMapsApiKey}>
          <GoogleMapComponent {...props} />
        </Wrapper>
      );
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