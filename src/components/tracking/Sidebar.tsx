import { Search, MapPin, Activity, Users, Radio } from 'lucide-react';
import { Person, Zone, ZONE_COLORS } from '@/data/mockData';

interface SidebarProps {
  persons: Person[];
  zones: Zone[];
  selectedPerson: string | null;
  onSelectPerson: (id: string | null) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onlineCount: number;
  offlineCount: number;
  onToggleStatus: (id: string) => void;
}

export default function Sidebar({
  persons, zones, selectedPerson, onSelectPerson,
  searchQuery, onSearchChange, onlineCount, offlineCount, onToggleStatus,
}: SidebarProps) {
  return (
    <div className="w-80 h-full flex flex-col bg-card border-r border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold font-mono text-foreground tracking-tight">TRACK.IO</h1>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full status-online" />
            <span className="text-muted-foreground">{onlineCount} online</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full status-offline" />
            <span className="text-muted-foreground">{offlineCount} offline</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search persons..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border focus:outline-none focus:border-primary/50 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Person List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Personnel</span>
          </div>
          <div className="space-y-1">
            {persons.map(person => (
              <button
                key={person.id}
                onClick={() => onSelectPerson(person.id === selectedPerson ? null : person.id)}
                className={`w-full text-left p-2.5 rounded-md transition-all text-sm ${
                  person.id === selectedPerson
                    ? 'bg-primary/10 border border-primary/30 glow-border'
                    : 'hover:bg-secondary border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: person.color, color: '#0d1117' }}
                  >
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground truncate">{person.name}</span>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${person.status === 'online' ? 'status-online' : 'status-offline'}`} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      {person.zone && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {person.zone}
                        </span>
                      )}
                      {person.status === 'online' && (
                        <span className="flex items-center gap-1">
                          <Activity className="h-3 w-3" /> {person.speed.toFixed(1)} km/h
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Zones Legend */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Zones</span>
        </div>
        <div className="space-y-1.5">
          {zones.map(zone => (
            <div key={zone.id} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: ZONE_COLORS[zone.color] || zone.color, opacity: 0.7 }}
              />
              <span className="text-foreground">{zone.name}</span>
              <span className="text-muted-foreground ml-auto capitalize">{zone.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
