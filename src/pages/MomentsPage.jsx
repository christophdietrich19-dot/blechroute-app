import AppHeader from "../components/AppHeader";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";

export default function MomentsPage({
  appState,
  activePage,
  currentUser,
  savedEntryIds,
  onToggleSavedEntry,
  onUpdateEntry,
  onDeleteEntry,
  onOpenFeed,
  onOpenMap,
  onOpenMenu
}) {
  const { user, entries, polaroids } = appState;

  const momentEntries = entries.filter((entry) => entry.type === "Moment");

  return (
    <section className="screen-page">
      <AppHeader
        compact
        userProfile={user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
      />

      <div className="welcome-block">
        <p className="section-label">Momente</p>
        <h2>Deine Erinnerungen auf einen Blick.</h2>
        <p>
          Alles, was nicht nur Strecke war. Fotos, kleine Geschichten und diese
          Augenblicke, die man später wiederfinden möchte.
        </p>
      </div>

      <div className="section-head">
        <h2>Polaroids</h2>
        <span>{polaroids.length} Bilder</span>
      </div>

      <div className="polaroid-row">
        {polaroids.map((item, index) => (
          <PolaroidCard item={item} tilted={index % 2 === 1} key={item.id} />
        ))}
      </div>

      <div className="section-head">
        <h2>Roadbook Momente</h2>
        <span>{momentEntries.length} Einträge</span>
      </div>

      <div className="entry-list">
        {momentEntries.length > 0 ? (
          momentEntries.map((entry) => (
            <RoadbookCard
              entry={entry}
              key={entry.id}
              currentUser={currentUser}
              savedEntryIds={savedEntryIds}
              onToggleSavedEntry={onToggleSavedEntry}
              onUpdateEntry={onUpdateEntry}
              onDeleteEntry={onDeleteEntry}
            />
          ))
        ) : (
          <article className="note-card">
            <p className="section-label">Noch leer</p>
            <h2>Hier erscheinen deine gespeicherten Momente.</h2>
            <p>
              Tippe unten auf das Plus und wähle „Moment“, um dein erstes
              Polaroid mit Geschichte anzulegen.
            </p>
          </article>
        )}
      </div>

      <article className="note-card">
        <p className="section-label">Idee</p>
        <h2>Ein guter Moment braucht nicht viel.</h2>
        <p>
          Ein Auto, ein Ort, ein Licht. Blechroute soll genau diese kleinen
          Erinnerungen sammeln, ohne dass es sich nach normalem Social Feed
          anfühlt.
        </p>
      </article>
    </section>
  );
}