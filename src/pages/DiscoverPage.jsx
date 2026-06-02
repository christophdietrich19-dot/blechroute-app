import AppHeader from "../components/AppHeader";
import { IconMapPin } from "../icons/Icons";

export default function DiscoverPage({ appState }) {
  return (
    <section className="screen-page">
      <AppHeader compact userProfile={appState.user} />

      <div className="search-book">
        <IconMapPin />
        <span>Touren, Orte oder Erinnerungen suchen</span>
      </div>

      <div className="section-head">
        <h2>Entdecken</h2>
        <span>Orte mit Geschichte</span>
      </div>

      <div className="spot-list">
        {appState.spots.map((spot) => (
          <article className="spot-card" key={spot.id}>
            <img src={spot.image} alt={spot.title} />

            <div>
              <p className="section-label">{spot.category}</p>
              <h3>{spot.title}</h3>
              <p>{spot.meta}</p>
              <strong>★ {spot.score}</strong>
            </div>
          </article>
        ))}
      </div>

      <article className="note-card">
        <p className="section-label">Wochenidee</p>
        <h2>Finde einen Ort, an dem du sonst nur vorbeifährst.</h2>
        <p>
          Nicht jeder Spot muss spektakulär sein. Manchmal reicht ein ruhiger
          Parkplatz, gutes Licht und ein Auto, das dazugehört.
        </p>
      </article>
    </section>
  );
}