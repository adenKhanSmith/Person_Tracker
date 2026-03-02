import { Users, Shield, AlertTriangle, Gauge } from 'lucide-react';

interface StatsBarProps {
  onlineCount: number;
  totalCount: number;
  zoneCount: number;
}

export default function StatsBar({ onlineCount, totalCount, zoneCount }: StatsBarProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-card border-b border-border">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
        <Users className="h-4 w-4 text-primary" />
        <span className="text-xs font-mono text-foreground">{onlineCount}/{totalCount} Active</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
        <Shield className="h-4 w-4 text-zone-green" />
        <span className="text-xs font-mono text-foreground">{zoneCount} Zones</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
        <AlertTriangle className="h-4 w-4 text-zone-orange" />
        <span className="text-xs font-mono text-foreground">0 Alerts</span>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary">
        <Gauge className="h-4 w-4 text-zone-blue" />
        <span className="text-xs font-mono text-foreground">Live</span>
        <span className="w-2 h-2 rounded-full status-online pulse-dot" />
      </div>
      <div className="ml-auto text-xs font-mono text-muted-foreground">
        {new Date().toLocaleTimeString()} — Real-Time Tracking
      </div>
    </div>
  );
}
