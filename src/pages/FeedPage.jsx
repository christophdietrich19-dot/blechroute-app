import AppHeader from "../components/AppHeader";
import DailyHighlight from "../components/DailyHighlight";
import PolaroidCard from "../components/PolaroidCard";
import RoadbookCard from "../components/RoadbookCard";
import WeeklyCarCard from "../components/WeeklyCarCard";
import { carImages, defaultRoadbookEntries, defaultVehicles } from "../data/demoData";

export default function FeedPage({ appState }) {
  const { user, entries, polaroids, vehicles } = appState;

  const featuredEntry = entries[0] || defaultRoadbookEntries[0];
  const weeklyVehicle = vehicles[0] || defaultVehicles[0];

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
      <AppHeader userProfile={user} />

      <div className="welcome-block">
        <p className="section-label">Roadbook</p>
        <h2>Guten Abend, {user.name}.</h2>
        <p>Schön, dass du wieder da bist. Welche Erinnerung bleibt heute?</p>
      </div>

      <DailyHighlight moment={dailyMoment} />

      <div className="section-head">
        <h2>Gespeicherte Momente</h2>
        <span>kleine Augenblicke</span>
      </div>

      <div className="polaroid-row">
        {polaroids.map((item, index) => (
          <PolaroidCard item={item} tilted={index === 1} key={item.id} />
        ))}
      </div>

      <div className="section-head">
        <h2>Blech der Woche</h2>
        <span>aus der Garage</span>
      </div>

      <WeeklyCarCard car={weeklyCar} />

      <div className="section-head">
        <h2>Empfohlene Tour</h2>
        <span>aus der Community</span>
      </div>

      <RoadbookCard entry={featuredEntry} featured />

      <div className="section-head">
        <h2>Aus der Community</h2>
        <span>ruhige Fundstücke</span>
      </div>

      <div className="entry-list">
        {entries.slice(1).map((entry) => (
          <RoadbookCard entry={entry} key={entry.id} />
        ))}
      </div>
    </section>
  );
}