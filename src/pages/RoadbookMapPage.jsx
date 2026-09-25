import AppHeader from "../components/AppHeader";
import RoadbookCard from "../components/RoadbookCard";
import { isOwnAuthor } from "../data/appSchema";

export default function RoadbookMapPage({
  appState,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenMessages,
  onOpenNotifications,
  unreadMessages = 0,
  unreadNotifications = 0,
  ...roadbookProps
}) {
  const entries = appState.entries.filter((entry) =>
    isOwnAuthor(entry.author, appState.user) && entry.location
  );
  const places = [...new Set(entries.map((entry) => entry.location.trim()).filter(Boolean))];

  function showPlace(place) {
    const index = entries.findIndex((entry) => entry.location.trim() === place);
    document.getElementById(`roadbook-place-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="screen-page roadbook-map-page">
      <AppHeader
        userProfile={appState.user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
        onOpenMessages={onOpenMessages}
        onOpenNotifications={onOpenNotifications}
        messageCount={unreadMessages}
        notificationCount={unreadNotifications}
      />

      <div className="welcome-block">
        <p className="section-label">Dein Roadbook</p>
        <h2>Meine Wege.</h2>
        <p>Orte und Touren, die du selbst festgehalten hast.</p>
      </div>

      <div className="roadbook-place-map" aria-label="Schematische Übersicht deiner gespeicherten Orte">
        <p className="section-label">Erinnerungskarte</p>
        {places.length > 0 ? (
          <div className="roadbook-place-list">
            {places.map((place, index) => (
              <button type="button" key={place} onClick={() => showPlace(place)}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{place}</strong>
                <small>{entries.filter((entry) => entry.location.trim() === place).length} Einträge →</small>
              </button>
            ))}
          </div>
        ) : (
          <p className="roadbook-empty-map">Deine Karte wartet auf den ersten gespeicherten Ort. Über das Plus kannst du eine Tour oder einen Spot festhalten.</p>
        )}
        <small>Übersicht nach Ortsnamen · keine GPS-Aufzeichnung</small>
      </div>

      {entries.length > 0 && (
        <>
          <div className="section-head"><h2>Deine Einträge</h2><span>{entries.length}</span></div>
          <div className="entry-list">
            {entries.map((entry, index) => (
              <div id={`roadbook-place-${index}`} key={entry.id} className="roadbook-map-entry">
                <RoadbookCard entry={entry} {...roadbookProps} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
