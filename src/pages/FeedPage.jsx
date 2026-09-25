import AppHeader from "../components/AppHeader";
import DailyHighlight from "../components/DailyHighlight";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";
import WeeklyCarCard from "../components/WeeklyCarCard";
import { carImages, defaultVehicles } from "../data/demoData";
import { isEntryVisible, isOwnAuthor } from "../data/appSchema";
import { CompassRose } from "../components/RoadbookArtwork";
import { RegionalRoadbookPaper, SilberseeArtwork } from "../components/RegionalRoadbookArtwork";
import StitchedBorder from "../components/StitchedBorder";

export default function FeedPage({
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
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenCommunity,
  onOpenRoadbookMap,
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
  const { user, entries, polaroids, vehicles } = appState;
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  const visibleEntries = entries.filter((entry) => isEntryVisible(entry, user, blockedProfiles));
  const weeklyVehicle = vehicles[0] || defaultVehicles[0];

  const ownEntries = visibleEntries.filter(
    (entry) => isOwnAuthor(entry.author, user)
  );
  const featuredEntry = ownEntries[0];

  const communityEntries = visibleEntries.filter(
    (entry) => !isOwnAuthor(entry.author, user) && entry.id !== featuredEntry?.id
  );

  const dailyMoment = {
    title: "Moment des Tages",
    headline: polaroids[0]?.title || "Sonnenuntergang am See",
    author: user.handle,
    place: polaroids[0]?.place || user.region,
    text:
      polaroids[0]?.caption ||
      "Nur kurz angehalten. Am Ende war es genau dieses Bild.",
    image: polaroids[0]?.image || carImages.bmwLake
  };

  const weeklyCar = {
    title: "Blech der Woche",
    headline: weeklyVehicle.name,
    author: user.handle,
    place: user.region,
    text: weeklyVehicle.story,
    image: weeklyVehicle.image
  };

  return (
    <section className="screen-page feed-page">
      <AppHeader
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

      <div className="feed-hero">
        <div className="welcome-block feed-welcome">
          <div className="roadbook-kicker"><p className="section-label">Roadbook</p><CompassRose /></div>
          <h2>{greeting}, {user.name}.</h2>
          <p>Deine nächste Geschichte beginnt auf der Straße.</p>
        </div>
        <div className="roadbook-photo-scene">
          <RegionalRoadbookPaper />
          <DailyHighlight moment={dailyMoment} />
        </div>
        <blockquote className="roadbook-quote">
          <StitchedBorder />
          <span className="quote-mark" aria-hidden="true">“</span>
          <p>Manche Straßen führen<br />nicht nur zu Orten,<br />sondern zu sich selbst.</p>
          <SilberseeArtwork />
        </blockquote>
      </div>

      <button className="roadbook-map-teaser" type="button" onClick={onOpenRoadbookMap}>
        <StitchedBorder />
        <span className="section-label">Deine Wege</span>
        <strong>Dein Roadbook auf einen Blick</strong>
        <small>{ownEntries.filter((entry) => entry.location).length} gespeicherte Erinnerungen · Übersicht öffnen →</small>
      </button>

      <div className="section-head feed-community-head">
        <h2>Aus der Community</h2>
        <button type="button" onClick={onOpenCommunity}>Alle ansehen <span aria-hidden="true">→</span></button>
      </div>

      <div className="entry-list feed-community-list">
        {communityEntries.length > 0 ? (
          communityEntries.map((entry) => (
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
            <p className="section-label">Community</p>
            <h2>Hier landen später Beiträge anderer Fahrer.</h2>
            <p>Die Beta läuft noch lokal auf deinem Gerät. Echte gemeinsame Beiträge kommen mit dem Server.</p>
          </article>
        )}
      </div>

      <div className="section-head">
        <h2>Deine Momente</h2>
        <span>{polaroids.length} Polaroids</span>
      </div>

      <div className="polaroid-row">
        {polaroids.map((item, index) => (
          <PolaroidCard item={item} tilted={index === 1} key={item.id} />
        ))}
      </div>

      <div className="section-head">
        <h2>Blech der Woche</h2>
        <span>aus deiner Garage</span>
      </div>

      <WeeklyCarCard car={weeklyCar} />

      <div className="section-head">
        <h2>Dein Roadbook</h2>
        <span>
          {ownEntries.length} {ownEntries.length === 1 ? "Eintrag" : "Einträge"}
        </span>
      </div>

      {featuredEntry ? (
        <RoadbookCard
          entry={featuredEntry}
          featured
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
      ) : (
        <article className="note-card"><StitchedBorder /><h2>Dein Roadbook ist noch leer.</h2><p>Über das Plus kannst du deine erste Tour festhalten.</p></article>
      )}

      {ownEntries.filter((entry) => entry.id !== featuredEntry?.id).slice(0, 2).map((entry) => (
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
      ))}

    </section>
  );
}
