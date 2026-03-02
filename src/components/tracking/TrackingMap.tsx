import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Person, Zone, ZONE_COLORS } from '@/data/mockData';

interface TrackingMapProps {
  persons: Person[];
  zones: Zone[];
  selectedPerson: string | null;
  onSelectPerson: (id: string | null) => void;
}

function createPersonIcon(color: string, avatar: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 36px; height: 36px;
        background: ${color};
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        color: #0d1117;
        font-weight: 700;
        font-size: 12px;
        font-family: 'Inter', sans-serif;
        border: 2px solid rgba(255,255,255,0.3);
        box-shadow: 0 0 14px ${color}88, 0 0 4px ${color}44;
      ">${avatar}</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function FlyToPerson({ person }: { person: Person | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (person) {
      map.flyTo([person.lat, person.lng], 16, { duration: 1 });
    }
  }, [person, map]);
  return null;
}

export default function TrackingMap({ persons, zones, selectedPerson, onSelectPerson }: TrackingMapProps) {
  const selected = persons.find(p => p.id === selectedPerson);

  return (
    <MapContainer
      center={[40.7128, -74.006]}
      zoom={15}
      className="h-full w-full rounded-lg"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToPerson person={selected} />

      {zones.map(zone => (
        <Polygon
          key={zone.id}
          positions={zone.coordinates}
          pathOptions={{
            color: ZONE_COLORS[zone.color] || zone.color,
            fillColor: ZONE_COLORS[zone.color] || zone.color,
            fillOpacity: 0.15,
            weight: 2,
            dashArray: zone.type === 'restricted' ? '8, 4' : undefined,
          }}
        >
          <Popup>
            <div className="font-mono text-sm">
              <strong>{zone.name}</strong>
              <br />
              Type: {zone.type}
            </div>
          </Popup>
        </Polygon>
      ))}

      {persons
        .filter(p => p.status === 'online')
        .map(person => (
          <Marker
            key={person.id}
            position={[person.lat, person.lng]}
            icon={createPersonIcon(person.color, person.avatar)}
            eventHandlers={{
              click: () => onSelectPerson(person.id),
            }}
          >
            <Popup>
              <div className="font-sans text-sm space-y-1">
                <div className="font-bold">{person.name}</div>
                <div className="opacity-80">Speed: {person.speed.toFixed(1)} km/h</div>
                {person.zone && <div className="opacity-80">Zone: {person.zone}</div>}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
