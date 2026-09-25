import StitchedBorder from "../components/StitchedBorder";
import AppHeader from "../components/AppHeader";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";
import { isEntryVisible } from "../data/appSchema";
import { IconPalm } from "../icons/Icons";
import { MapPaper } from "../components/RoadbookArtwork";

export default function MomentsPage({
  appState,
  activePage,
  currentUser,
  savedEntryIds,
  likedEntryIds,
  followingHandles,
  onToggleSavedEntry,
  onToggleLikedEntry,
  onToggleFollow,
  onUpdateEntry,
  onDeleteEntry,
  onOpenCommunityProfile,
  blockedProfiles = [],
  onReportEntry,
  onShareEntry,
  onRepostEntry,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onCreateMoment,
  onOpenMessages,
  onOpenNotifications,
  unreadMessages = 0,
  unreadNotifications = 0
}) {
  const { user, entries, polaroids } = appState;

  const momentEntries = entries.filter((entry) =>
    entry.type === "Moment" && isEntryVisible(entry, user, blockedProfiles)
  );

  return (
    <section className="screen-page moments-page">
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
        <div className="moments-title-row">
          <p className="section-label moments-kicker">Momente</p>
          <span className="moments-palm" aria-hidden="true"><IconPalm /></span>
        </div>
        <h2>Geschichten, die bleiben.</h2>
        <p>
          Besondere Orte. Starke Augenblicke.
          Ein Stück auf dem gemeinsamen Weg.
        </p>
      </div>

      <div className="moments-collage">
        <MapPaper />
        {polaroids.map((item, index) => <PolaroidCard item={item} tilted={index % 2 === 1} key={item.id} />)}
      </div>

      <button className="story-primary-action" type="button" onClick={onCreateMoment}>
        <StitchedBorder />Moment teilen <span aria-hidden="true">→</span>
      </button>

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
            <p className="section-label">Noch leer</p>
            <h2>Hier erscheinen deine gespeicherten Momente.</h2>
            <p>
              Tippe unten auf das Plus und wähle „Moment“, um dein erstes
              Polaroid mit Geschichte anzulegen.
            </p>
          </article>
        )}
      </div>

      <article className="note-card"><StitchedBorder />
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
