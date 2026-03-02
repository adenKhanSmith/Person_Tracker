export interface Person {
  id: string;
  name: string;
  color: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline';
  speed: number; // km/h
  zone?: string;
  avatar: string;
}

export interface Zone {
  id: string;
  name: string;
  color: string;
  coordinates: [number, number][];
  type: 'restricted' | 'safe' | 'monitored' | 'custom';
}

export const ZONE_COLORS: Record<string, string> = {
  red: '#e04848',
  orange: '#e08a30',
  green: '#3cb55c',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  yellow: '#eab308',
  cyan: '#22d3ee',
};

export const initialPersons: Person[] = [
  { id: '1', name: 'Alex Morgan', color: '#22d3ee', lat: 40.7128, lng: -74.006, status: 'online', speed: 5.2, zone: 'HQ Campus', avatar: 'AM' },
  { id: '2', name: 'Sarah Chen', color: '#f97316', lat: 40.7148, lng: -74.002, status: 'online', speed: 3.1, zone: 'East Block', avatar: 'SC' },
  { id: '3', name: 'James Wilson', color: '#a855f7', lat: 40.7108, lng: -74.009, status: 'online', speed: 0, zone: 'HQ Campus', avatar: 'JW' },
  { id: '4', name: 'Maria Garcia', color: '#ef4444', lat: 40.7158, lng: -74.012, status: 'offline', speed: 0, avatar: 'MG' },
  { id: '5', name: 'David Kim', color: '#10b981', lat: 40.7118, lng: -74.004, status: 'online', speed: 8.7, zone: 'Parking Area', avatar: 'DK' },
  { id: '6', name: 'Emma Thompson', color: '#eab308', lat: 40.7138, lng: -74.008, status: 'online', speed: 1.2, zone: 'West Wing', avatar: 'ET' },
  { id: '7', name: 'Raj Patel', color: '#ec4899', lat: 40.7098, lng: -74.003, status: 'online', speed: 4.5, zone: 'East Block', avatar: 'RP' },
  { id: '8', name: 'Lisa Brown', color: '#06b6d4', lat: 40.7168, lng: -74.007, status: 'offline', speed: 0, avatar: 'LB' },
];

export const initialZones: Zone[] = [
  {
    id: 'z1',
    name: 'HQ Campus',
    color: 'green',
    type: 'safe',
    coordinates: [
      [40.7115, -74.009],
      [40.7115, -74.004],
      [40.7140, -74.004],
      [40.7140, -74.009],
    ],
  },
  {
    id: 'z2',
    name: 'East Block',
    color: 'blue',
    type: 'monitored',
    coordinates: [
      [40.7140, -74.004],
      [40.7140, -74.000],
      [40.7160, -74.000],
      [40.7160, -74.004],
    ],
  },
  {
    id: 'z3',
    name: 'Restricted Area',
    color: 'red',
    type: 'restricted',
    coordinates: [
      [40.7090, -74.012],
      [40.7090, -74.009],
      [40.7110, -74.009],
      [40.7110, -74.012],
    ],
  },
  {
    id: 'z4',
    name: 'Parking Area',
    color: 'orange',
    type: 'custom',
    coordinates: [
      [40.7105, -74.006],
      [40.7105, -74.003],
      [40.7115, -74.003],
      [40.7115, -74.006],
    ],
  },
  {
    id: 'z5',
    name: 'West Wing',
    color: 'purple',
    type: 'monitored',
    coordinates: [
      [40.7130, -74.012],
      [40.7130, -74.009],
      [40.7150, -74.009],
      [40.7150, -74.012],
    ],
  },
];
