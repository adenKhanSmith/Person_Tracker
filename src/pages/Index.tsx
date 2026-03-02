import { useTracking } from '@/hooks/useTracking';
import TrackingMap from '@/components/tracking/TrackingMap';
import Sidebar from '@/components/tracking/Sidebar';
import StatsBar from '@/components/tracking/StatsBar';

const Index = () => {
  const {
    persons, zones, filteredPersons, selectedPerson, setSelectedPerson,
    searchQuery, setSearchQuery, onlineCount, offlineCount, togglePersonStatus,
  } = useTracking();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar
        persons={filteredPersons}
        zones={zones}
        selectedPerson={selectedPerson}
        onSelectPerson={setSelectedPerson}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onlineCount={onlineCount}
        offlineCount={offlineCount}
        onToggleStatus={togglePersonStatus}
      />
      <div className="flex-1 flex flex-col">
        <StatsBar
          onlineCount={onlineCount}
          totalCount={persons.length}
          zoneCount={zones.length}
        />
        <div className="flex-1 relative">
          <TrackingMap
            persons={persons}
            zones={zones}
            selectedPerson={selectedPerson}
            onSelectPerson={setSelectedPerson}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
