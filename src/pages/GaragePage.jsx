import { useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import GarageCard from "../components/GarageCard";
import VehicleDetail from "../components/VehicleDetail";

export default function GaragePage({
  appState,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onUpdateVehicle,
  onDeleteVehicle
}) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Alle");

  const vehicleTypes = useMemo(() => {
    const types = appState.vehicles.map((vehicle) => vehicle.type).filter(Boolean);
    return ["Alle", ...new Set(types)];
  }, [appState.vehicles]);

  const filteredVehicles = useMemo(() => {
    if (activeFilter === "Alle") {
      return appState.vehicles;
    }

    return appState.vehicles.filter((vehicle) => vehicle.type === activeFilter);
  }, [activeFilter, appState.vehicles]);

  const selectedVehicle = appState.vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );

  const publicCount = appState.vehicles.filter(
    (vehicle) => vehicle.visibility === "Öffentlich"
  ).length;

  function closeDetail() {
    setSelectedVehicleId(null);
  }

  function handleDeleteVehicle(vehicleId) {
    onDeleteVehicle(vehicleId);
    closeDetail();
  }

  return (
    <section className="screen-page">
      <AppHeader
        compact
        userProfile={appState.user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
      />

      <div className="welcome-block">
        <p className="section-label">Garage</p>
        <h2>Deine Fahrzeuge, deine Geschichten.</h2>
        <p>
          Hier liegt nicht nur Blech. Hier liegen Projekte, Erinnerungen und
          alles, was später Teil deiner Route wird.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "9px",
          marginBottom: "16px"
        }}
      >
        <article className="stat-card">
          <strong>{appState.vehicles.length}</strong>
          <span>Autos</span>
        </article>

        <article className="stat-card">
          <strong>{publicCount}</strong>
          <span>Öffentlich</span>
        </article>

        <article className="stat-card">
          <strong>{vehicleTypes.length - 1}</strong>
          <span>Typen</span>
        </article>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "2px 2px 12px",
          scrollbarWidth: "none"
        }}
      >
        {vehicleTypes.map((type) => (
          <button
            className={activeFilter === type ? "soft-action active" : "soft-action"}
            key={type}
            type="button"
            onClick={() => setActiveFilter(type)}
            style={{
              flex: "0 0 auto"
            }}
          >
            <span>{type}</span>
          </button>
        ))}
      </div>

      <div className="section-head">
        <h2>Fahrzeugakte</h2>
        <span>{filteredVehicles.length} Treffer</span>
      </div>

      <div className="garage-list">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <GarageCard
              vehicle={vehicle}
              key={vehicle.id}
              onOpen={() => setSelectedVehicleId(vehicle.id)}
            />
          ))
        ) : (
          <article className="note-card">
            <p className="section-label">Keine Treffer</p>
            <h2>Für diesen Filter gibt es noch kein Fahrzeug.</h2>
            <p>
              Tippe unten auf das Plus und füge ein neues Fahrzeug in deiner
              Garage hinzu.
            </p>
          </article>
        )}
      </div>

      <article className="note-card">
        <p className="section-label">Garagen Idee</p>
        <h2>Jedes Auto bekommt später seine eigene Chronik.</h2>
        <p>
          Umbauten, Bilder, Fahrten, Erinnerungen und kleine Notizen können
          später direkt am Fahrzeug hängen.
        </p>
      </article>

      {selectedVehicle && (
        <VehicleDetail
          vehicle={selectedVehicle}
          onClose={closeDetail}
          onUpdateVehicle={onUpdateVehicle}
          onDeleteVehicle={handleDeleteVehicle}
        />
      )}
    </section>
  );
}