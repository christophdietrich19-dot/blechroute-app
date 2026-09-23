import AppHeader from "../components/AppHeader";
import DailyHighlight from "../components/DailyHighlight";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";
import WeeklyCarCard from "../components/WeeklyCarCard";
import { carImages, defaultVehicles } from "../data/demoData";
import { isEntryVisible, isOwnAuthor } from "../data/appSchema";

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

  const visibleEntries = entries.filter((entry) => isEntryVisible(entry, user, blockedProfiles));
  const weeklyVehicle = vehicles[0] || defaultVehicles[0];

  const ownEntries = visibleEntries.filter(
    (entry) => isOwnAuthor(entry.author, user)
  );
  const featuredEntry = ownEntries[0] || visibleEntries[0];

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

      <div className="welcome-block">
        <p className="section-label">Roadbook</p>
        <h2>Guten Abend, {user.name}.</h2>
        <p>Deine nächste Geschichte beginnt auf der Straße.</p>
      </div>

      <DailyHighlight moment={dailyMoment} />

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
        <article className="note-card"><h2>Dein Roadbook ist noch leer.</h2><p>Über das Plus kannst du deine erste Tour festhalten.</p></article>
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

      <div className="section-head">
        <h2>Community</h2>
        <span>Fundstücke anderer Fahrer</span>
      </div>

      <div className="entry-list">
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
          <article className="note-card">
            <p className="section-label">Community</p>
            <h2>Hier landen später Beiträge anderer Fahrer.</h2>
            <p>
              Aktuell läuft Blechroute noch lokal auf deinem Gerät. Mit dem
              Backend kommen echte Nutzer, Kommentare und gemeinsame Roadbooks.
            </p>
          </article>
        )}
      </div>
    </section>
  );
}
