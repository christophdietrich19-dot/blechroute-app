import AppHeader from "../components/AppHeader";
import DailyHighlight from "../components/DailyHighlight";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";
import WeeklyCarCard from "../components/WeeklyCarCard";
import { carImages, defaultRoadbookEntries, defaultVehicles } from "../data/demoData";

export default function FeedPage({
  appState,
  activePage,
  currentUser,
  savedEntryIds,
  onToggleSavedEntry,
  onUpdateEntry,
  onDeleteEntry,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenCommunityProfile
}) {
  const { user, entries, polaroids, vehicles } = appState;

  const featuredEntry = entries[0] || defaultRoadbookEntries[0];
  const weeklyVehicle = vehicles[0] || defaultVehicles[0];

  const ownEntries = entries.filter(
    (entry) => !entry.author || entry.author.handle === user.handle
  );

  const communityEntries = entries.filter(
    (entry) => entry.author && entry.author.handle !== user.handle
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
    <section className="screen-page">
      <AppHeader
        userProfile={user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
      />

      <div className="welcome-block">
        <p className="section-label">Roadbook</p>
        <h2>Guten Abend, {user.name}.</h2>
        <p>Schön, dass du wieder da bist. Welche Erinnerung bleibt heute?</p>
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
        <span>{ownEntries.length} Einträge</span>
      </div>

      <RoadbookCard
        entry={featuredEntry}
        featured
        currentUser={currentUser}
        savedEntryIds={savedEntryIds}
        onToggleSavedEntry={onToggleSavedEntry}
        onUpdateEntry={onUpdateEntry}
        onDeleteEntry={onDeleteEntry}
        onOpenCommunityProfile={onOpenCommunityProfile}
      />

      {ownEntries.slice(1, 3).map((entry) => (
        <RoadbookCard
          entry={entry}
          key={entry.id}
          currentUser={currentUser}
          savedEntryIds={savedEntryIds}
          onToggleSavedEntry={onToggleSavedEntry}
          onUpdateEntry={onUpdateEntry}
          onDeleteEntry={onDeleteEntry}
          onOpenCommunityProfile={onOpenCommunityProfile}
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
              onToggleSavedEntry={onToggleSavedEntry}
              onUpdateEntry={onUpdateEntry}
              onDeleteEntry={onDeleteEntry}
              onOpenCommunityProfile={onOpenCommunityProfile}
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