import { useState, useEffect, useCallback } from 'react';
import { Person, Zone, initialPersons, initialZones } from '@/data/mockData';

export function useTracking() {
  const [persons, setPersons] = useState<Person[]>(initialPersons);
  const [zones] = useState<Zone[]>(initialZones);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPersons(prev =>
        prev.map(person => {
          if (person.status === 'offline') return person;
          const jitter = 0.0003;
          return {
            ...person,
            lat: person.lat + (Math.random() - 0.5) * jitter,
            lng: person.lng + (Math.random() - 0.5) * jitter,
            speed: Math.max(0, person.speed + (Math.random() - 0.5) * 2),
          };
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineCount = persons.filter(p => p.status === 'online').length;
  const offlineCount = persons.filter(p => p.status === 'offline').length;

  const togglePersonStatus = useCallback((id: string) => {
    setPersons(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, status: p.status === 'online' ? 'offline' : 'online', speed: p.status === 'online' ? 0 : 3 }
          : p
      )
    );
  }, []);

  return {
    persons,
    zones,
    filteredPersons,
    selectedPerson,
    setSelectedPerson,
    searchQuery,
    setSearchQuery,
    onlineCount,
    offlineCount,
    togglePersonStatus,
  };
}
