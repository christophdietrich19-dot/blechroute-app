import { useMemo } from "react";
import AppHeader from "../components/AppHeader";
import StitchedBorder from "../components/StitchedBorder";
import { IconEdit, IconMapPin, IconGarage, IconUsers } from "../icons/Icons";
import { tasks } from "../data/demoData";
import { isOwnAuthor } from "../data/appSchema";

export default function ProfilePage({
  appState,
  activePage,
  onEditProfile,
  onResetDemo,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenGarage,
  onOpenRoadbookMap,
  onOpenMessages,
  onOpenNotifications,
  unreadMessages = 0,
  unreadNotifications = 0
}) {
  const ownTours = appState.entries.filter((entry) => entry.type === "Tour" && isOwnAuthor(entry.author, appState.user));
  const stats = useMemo(
    () => [
      {
        label: "Touren",
        value: ownTours.length
      },
      {
        label: "Spots",
        value: appState.spots.length
      },
      {
        label: "Momente",
        value: appState.polaroids.length
      },
      {
        label: "Autos",
        value: appState.vehicles.length
      }
    ],
    [appState]
  );

  return (
    <section className="screen-page profile-page">
      <AppHeader
        compact
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

      <div className="profile-heading">
        <div><p className="section-label">Profil</p><h2>{appState.user.name}</h2></div>
        <button className="profile-edit" type="button" onClick={onEditProfile}><IconEdit /> Profil bearbeiten</button>
      </div>
      <p className="profile-intro">Autos. Straßen. Gute Geschichten.</p>
      <article className="profile-identity">
        <div className="profile-portrait"><img src={appState.user.avatar} alt={appState.user.name} /></div>
        <div className="profile-facts">
          <span><IconMapPin />{appState.user.region || "Dein Roadbook"}</span>
          {appState.vehicles[0] && <span><IconGarage />{appState.vehicles[0].name}</span>}
          <span><IconUsers />{appState.followingHandles?.length || 0} folge ich</span>
          <span>{appState.user.handle}</span>
          <p>{appState.user.bio}</p>
        </div>
      </article>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="profile-collection-head"><p className="section-label">Meine Garage</p><button type="button" onClick={onOpenGarage}>Alle anzeigen ›</button></div>
      {appState.vehicles.slice(0, 1).map((vehicle) => <button className="profile-preview-row" key={vehicle.id} type="button" onClick={onOpenGarage}>
        <img src={vehicle.image} alt="" /><span><strong>{vehicle.name}</strong><small>{vehicle.status}</small></span><span aria-hidden="true">›</span>
      </button>)}
      <div className="profile-collection-head"><p className="section-label">Meine Touren</p><button type="button" onClick={onOpenRoadbookMap}>Alle anzeigen ›</button></div>
      {ownTours.slice(0, 1).map((entry) => <button className="profile-preview-row" key={entry.id} type="button" onClick={onOpenRoadbookMap}>
        <img src={entry.image} alt="" /><span><strong>{entry.title}</strong><small>{[entry.distance, entry.location, entry.date].filter(Boolean).join(" · ")}</small></span><span aria-hidden="true">›</span>
      </button>)}
      {!ownTours.length && <p className="profile-intro">Deine erste Tour wartet noch auf ihre Geschichte.</p>}

      <div className="section-head">
        <h2>Dein Roadbook wächst</h2>
        <span>kleine Ziele</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <StitchedBorder />
            <div>
              <h3>{task.title}</h3>
              <p>{task.text}</p>
            </div>

            <div className="progress-line">
              <span style={{ width: `${task.progress}%` }} />
            </div>
          </article>
        ))}
      </div>

      <article className="note-card">
        <StitchedBorder />
        <p className="section-label">Beta Hinweis</p>
        <h2>Alles, was du hier einträgst, bleibt aktuell auf deinem Gerät.</h2>
        <p>
          Blechroute speichert diese Demo lokal im Browser. Echte Konten,
          gemeinsame Kommentare und Roadbooks kommen später mit dem Backend dazu.
        </p>
      </article>
      <div className="profile-actions"><button type="button" onClick={onResetDemo}>Demo zurücksetzen</button></div>
    </section>
  );
}
