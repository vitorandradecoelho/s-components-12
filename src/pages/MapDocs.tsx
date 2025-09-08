import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Map, MapMarker, MapPolyline, MapPolygon, MapCircle } from '../components/library/Map';
import { useLanguage } from '../contexts/LanguageContext';

const MapDocs = () => {
  const { language } = useLanguage();
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);
  const [googleApiKey, setGoogleApiKey] = useState('');

  const sampleMarkers: MapMarker[] = [
    {
      id: '1',
      lat: -23.5505,
      lng: -46.6333,
      title: 'São Paulo',
      description: 'Maior cidade do Brasil'
    },
    {
      id: '2',
      lat: -22.9068,
      lng: -43.1729,
      title: 'Rio de Janeiro',
      description: 'Cidade Maravilhosa'
    },
    {
      id: '3',
      lat: -15.7942,
      lng: -47.8822,
      title: 'Brasília',
      description: 'Capital do Brasil'
    }
  ];

  const samplePolylines: MapPolyline[] = [
    {
      id: '1',
      positions: [
        [-23.5505, -46.6333],
        [-22.9068, -43.1729],
        [-15.7942, -47.8822]
      ],
      color: '#ff0000',
      weight: 3
    }
  ];

  const samplePolygons: MapPolygon[] = [
    {
      id: '1',
      positions: [
        [-23.5505, -46.6333],
        [-22.9068, -43.1729],
        [-15.7942, -47.8822],
        [-19.9167, -43.9345]
      ],
      color: '#00ff00',
      fillColor: '#00ff00',
      fillOpacity: 0.3
    }
  ];

  const sampleCircles: MapCircle[] = [
    {
      id: '1',
      center: [-23.5505, -46.6333],
      radius: 100000,
      color: '#0000ff',
      fillColor: '#0000ff',
      fillOpacity: 0.2
    }
  ];

  const texts = {
    pt: {
      title: 'Map - Componente de Mapa',
      description: 'Componente flexível para exibição de mapas com suporte a OpenStreetMap e Google Maps',
      basicUsage: 'Uso Básico',
      examples: 'Exemplos',
      api: 'API',
      openStreetExample: 'OpenStreetMap Básico',
      googleMapsExample: 'Google Maps',
      markersExample: 'Mapa com Marcadores',
      shapesExample: 'Formas Geométricas',
      interactiveExample: 'Mapa Interativo',
      props: 'Propriedades',
      types: 'Tipos',
      provider: 'Provedor do mapa',
      center: 'Centro inicial do mapa',
      zoom: 'Nível de zoom inicial',
      height: 'Altura do mapa',
      width: 'Largura do mapa',
      className: 'Classes CSS adicionais',
      markers: 'Array de marcadores',
      polylines: 'Array de linhas',
      polygons: 'Array de polígonos',
      circles: 'Array de círculos',
      googleMapsApiKey: 'Chave da API do Google Maps',
      onMarkerClick: 'Callback ao clicar em marcador',
      onMapClick: 'Callback ao clicar no mapa',
      showZoomControls: 'Exibir controles de zoom',
      interactive: 'Permitir interação com o mapa',
      plotFunctions: 'Funções de Plotagem',
      plotDescription: 'O componente Map oferece várias opções para plotar elementos no mapa:',
      markersDesc: 'Pontos de interesse com popup informativo',
      polylinesDesc: 'Linhas conectando pontos geográficos',
      polygonsDesc: 'Áreas delimitadas por polígonos',
      circlesDesc: 'Áreas circulares com raio definido',
      heatmapsDesc: 'Mapas de calor (disponível com extensões)',
      clusteringDesc: 'Agrupamento de marcadores próximos',
      selectedMarker: 'Marcador selecionado:',
      clickedAt: 'Clicado em:',
      enterApiKey: 'Digite sua chave da API do Google Maps:',
      loadGoogleMap: 'Carregar Google Maps'
    },
    en: {
      title: 'Map - Map Component',
      description: 'Flexible component for displaying maps with OpenStreetMap and Google Maps support',
      basicUsage: 'Basic Usage',
      examples: 'Examples',
      api: 'API',
      openStreetExample: 'Basic OpenStreetMap',
      googleMapsExample: 'Google Maps',
      markersExample: 'Map with Markers',
      shapesExample: 'Geometric Shapes',
      interactiveExample: 'Interactive Map',
      props: 'Properties',
      types: 'Types',
      provider: 'Map provider',
      center: 'Initial map center',
      zoom: 'Initial zoom level',
      height: 'Map height',
      width: 'Map width',
      className: 'Additional CSS classes',
      markers: 'Array of markers',
      polylines: 'Array of lines',
      polygons: 'Array of polygons',
      circles: 'Array of circles',
      googleMapsApiKey: 'Google Maps API key',
      onMarkerClick: 'Callback when clicking marker',
      onMapClick: 'Callback when clicking map',
      showZoomControls: 'Show zoom controls',
      interactive: 'Allow map interaction',
      plotFunctions: 'Plotting Functions',
      plotDescription: 'The Map component offers several options for plotting elements on the map:',
      markersDesc: 'Points of interest with informative popup',
      polylinesDesc: 'Lines connecting geographic points',
      polygonsDesc: 'Areas delimited by polygons',
      circlesDesc: 'Circular areas with defined radius',
      heatmapsDesc: 'Heat maps (available with extensions)',
      clusteringDesc: 'Clustering of nearby markers',
      selectedMarker: 'Selected marker:',
      clickedAt: 'Clicked at:',
      enterApiKey: 'Enter your Google Maps API key:',
      loadGoogleMap: 'Load Google Maps'
    }
  };

  const t = texts[language];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground text-lg">{t.description}</p>
      </div>

      <Tabs defaultValue="examples" className="w-full">
        <TabsList>
          <TabsTrigger value="examples">{t.examples}</TabsTrigger>
          <TabsTrigger value="api">{t.api}</TabsTrigger>
        </TabsList>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.openStreetExample}</CardTitle>
              <CardDescription>
                Mapa básico usando OpenStreetMap como provedor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Map
                provider="openstreet"
                center={[-14.235, -51.9253]}
                zoom={4}
                height="300px"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.googleMapsExample}</CardTitle>
              <CardDescription>
                Para usar Google Maps, é necessário fornecer uma chave da API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={t.enterApiKey}
                  value={googleApiKey}
                  onChange={(e) => setGoogleApiKey(e.target.value)}
                />
                <Button variant="outline">
                  {t.loadGoogleMap}
                </Button>
              </div>
              {googleApiKey ? (
                <Map
                  provider="google"
                  googleMapsApiKey={googleApiKey}
                  center={[-14.235, -51.9253]}
                  zoom={4}
                  height="300px"
                />
              ) : (
                <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    Digite uma chave da API para visualizar o Google Maps
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.markersExample}</CardTitle>
              <CardDescription>
                Mapa com marcadores interativos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Map
                provider="openstreet"
                center={[-15.7942, -47.8822]}
                zoom={5}
                height="400px"
                markers={sampleMarkers}
                onMarkerClick={setSelectedMarker}
              />
              {selectedMarker && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold">{t.selectedMarker}</h4>
                  <p><strong>{selectedMarker.title}</strong></p>
                  <p>{selectedMarker.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Lat: {selectedMarker.lat}, Lng: {selectedMarker.lng}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.shapesExample}</CardTitle>
              <CardDescription>
                Mapa com linhas, polígonos e círculos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Map
                provider="openstreet"
                center={[-20, -45]}
                zoom={5}
                height="400px"
                markers={sampleMarkers}
                polylines={samplePolylines}
                polygons={samplePolygons}
                circles={sampleCircles}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.interactiveExample}</CardTitle>
              <CardDescription>
                Clique no mapa para ver as coordenadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Map
                provider="openstreet"
                center={[-14.235, -51.9253]}
                zoom={4}
                height="300px"
                onMapClick={(lat, lng) => setClickedPosition([lat, lng])}
              />
              {clickedPosition && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold">{t.clickedAt}</h4>
                  <p>Lat: {clickedPosition[0].toFixed(6)}</p>
                  <p>Lng: {clickedPosition[1].toFixed(6)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.plotFunctions}</CardTitle>
              <CardDescription>{t.plotDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge variant="secondary">Markers</Badge>
                  <p className="text-sm">{t.markersDesc}</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Polylines</Badge>
                  <p className="text-sm">{t.polylinesDesc}</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Polygons</Badge>
                  <p className="text-sm">{t.polygonsDesc}</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Circles</Badge>
                  <p className="text-sm">{t.circlesDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.props}</CardTitle>
              <CardDescription>
                Propriedades disponíveis para o componente Map
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-2 text-left">Propriedade</th>
                      <th className="border border-border p-2 text-left">Tipo</th>
                      <th className="border border-border p-2 text-left">Padrão</th>
                      <th className="border border-border p-2 text-left">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2 font-mono">provider</td>
                      <td className="border border-border p-2">'openstreet' | 'google'</td>
                      <td className="border border-border p-2">'openstreet'</td>
                      <td className="border border-border p-2">{t.provider}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">center</td>
                      <td className="border border-border p-2">[number, number]</td>
                      <td className="border border-border p-2">[-14.235, -51.9253]</td>
                      <td className="border border-border p-2">{t.center}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">zoom</td>
                      <td className="border border-border p-2">number</td>
                      <td className="border border-border p-2">4</td>
                      <td className="border border-border p-2">{t.zoom}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">height</td>
                      <td className="border border-border p-2">string</td>
                      <td className="border border-border p-2">'400px'</td>
                      <td className="border border-border p-2">{t.height}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">width</td>
                      <td className="border border-border p-2">string</td>
                      <td className="border border-border p-2">'100%'</td>
                      <td className="border border-border p-2">{t.width}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">markers</td>
                      <td className="border border-border p-2">MapMarker[]</td>
                      <td className="border border-border p-2">[]</td>
                      <td className="border border-border p-2">{t.markers}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">onMarkerClick</td>
                  <td className="border border-border p-2">(marker: MapMarker) =&gt; void</td>
                  <td className="border border-border p-2">-</td>
                  <td className="border border-border p-2">{t.onMarkerClick}</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 font-mono">onMapClick</td>
                  <td className="border border-border p-2">(lat: number, lng: number) =&gt; void</td>
                      <td className="border border-border p-2">-</td>
                      <td className="border border-border p-2">{t.onMapClick}</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2 font-mono">interactive</td>
                      <td className="border border-border p-2">boolean</td>
                      <td className="border border-border p-2">true</td>
                      <td className="border border-border p-2">{t.interactive}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.types}</CardTitle>
              <CardDescription>
                Interfaces TypeScript utilizadas pelo componente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  icon?: string;
}

interface MapPolyline {
  id: string;
  positions: [number, number][];
  color?: string;
  weight?: number;
}

interface MapPolygon {
  id: string;
  positions: [number, number][];
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

interface MapCircle {
  id: string;
  center: [number, number];
  radius: number;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MapDocs;