import StitchedBorder from "../components/StitchedBorder";
import AppHeader from "../components/AppHeader";
import RoadbookCard from "../components/RoadbookCard";
import { isEntryVisible } from "../data/appSchema";

export default function SavedPage({
  appState,
  activePage,
  currentUser,
  savedEntryIds = [],
  likedEntryIds = [],
  followingHandles = [],
  onToggleSavedEntry,
  onToggleLikedEntry,
  onToggleFollow,
  onUpdateEntry,
  onDeleteEntry,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenMessages,
  onOpenNotifications,
  unreadMessages = 0,
  unreadNotifications = 0,
  onOpenCommunityProfile,
  blockedProfiles = [],
  onReportEntry,
  onShareEntry,
  onRepostEntry
}) {
  const { user, entries } = appState;

  const savedEntries = entries.filter((entry) =>
    savedEntryIds.includes(entry.id) && isEntryVisible(entry, user, blockedProfiles)
  );

  return (
    <section className="screen-page">
      <AppHeader
        compact
        userProfile={user}
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
        <p className="section-label">Gespeichert</p>
        <h2>Beiträge, die du wiederfinden willst.</h2>
        <p>
          Alles, was du dir merkst, landet hier. Später können daraus Favoriten,
          Tourideen oder gespeicherte Spots werden.
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
          <strong>{savedEntries.length}</strong>
          <span>Gespeichert</span>
        </article>

        <article className="stat-card">
          <strong>{entries.length}</strong>
          <span>Beiträge</span>
        </article>

        <article className="stat-card">
          <strong>
            {savedEntries.filter((entry) => entry.type === "Spot").length}
          </strong>
          <span>Spots</span>
        </article>
      </div>

      <div className="section-head">
        <h2>Deine Sammlung</h2>
        <span>{savedEntries.length} Einträge</span>
      </div>

      <div className="entry-list">
        {savedEntries.length > 0 ? (
          savedEntries.map((entry) => (
            <RoadbookCard
              entry={entry}
              key={entry.id}
              currentUser={currentUser}
              savedEntryIds={savedEntryIds}
              likedEntryIds={likedEntryIds}
              followingHandles={followingHandles}
              onToggleSavedEntry={onToggleSavedEntry}
              onToggleLikedEntry={onToggleLikedEntry}
              onToggleFollow={onToggleFollow}
              onUpdateEntry={onUpdateEntry}
              onDeleteEntry={onDeleteEntry}
              onOpenCommunityProfile={onOpenCommunityProfile}
              onReportEntry={onReportEntry}
              onShareEntry={onShareEntry}
              onRepostEntry={onRepostEntry}
            />
          ))
        ) : (
          <article className="note-card"><StitchedBorder />
            <p className="section-label">Noch nichts gemerkt</p>
            <h2>Deine gespeicherten Beiträge erscheinen hier.</h2>
            <p>
              Tippe im Feed bei einem Beitrag auf das Speichern Symbol. Danach
              findest du ihn hier im Menü unter „Gespeichert“ wieder.
            </p>

            <button
              type="button"
              className="soft-action active"
              onClick={onOpenFeed}
              style={{
                marginTop: "14px"
              }}
            >
              Zum Feed
            </button>
          </article>
        )}
      </div>

      <article className="note-card"><StitchedBorder />
        <p className="section-label">Später</p>
        <h2>Aus gespeicherten Beiträgen kann mehr werden.</h2>
        <p>
          Favoriten, Tourlisten, geplante Ziele oder private Sammlungen. Das ist
          der erste Schritt dafür.
        </p>
      </article>
    </section>
  );
}
