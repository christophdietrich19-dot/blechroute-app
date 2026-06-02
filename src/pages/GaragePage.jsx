import AppHeader from "../components/AppHeader";
import GarageCard from "../components/GarageCard";

export default function GaragePage({ appState }) {
  return (
    <section className="screen-page">
      <AppHeader compact userProfile={appState.user} />

      <div className="section-head">
        <h2>Garage</h2>
        <span>{appState.vehicles.length} Fahrzeuge</span>
      </div>

      <div className="garage-list">
        {appState.vehicles.map((vehicle) => (
          <GarageCard vehicle={vehicle} key={vehicle.id} />
        ))}
      </div>
    </section>
  );
}