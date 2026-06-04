import { useMemo } from "react";
import AppHeader from "../components/AppHeader";
import { IconEdit } from "../icons/Icons";
import { tasks } from "../data/demoData";

export default function ProfilePage({
  appState,
  activePage,
  onEditProfile,
  onResetDemo,
  onOpenFeed,
  onOpenMap,
  onOpenMenu
}) {
  const stats = useMemo(
    () => [
      {
        label: "Touren",
        value: appState.entries.filter((entry) => entry.type === "Tour").length
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
        label: "Kilometer",
        value: appState.entries.length * 42
      },
      {
        label: "Autos",
        value: appState.vehicles.length
      }
    ],
    [appState]
  );

  return (
    <section className="screen-page">
      <AppHeader
        compact
        userProfile={appState.user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
      />

      <article className="profile-card">
        <img src={appState.user.avatar} alt={appState.user.name} />

        <div>
          <p className="section-label">Roadbook</p>
          <h2>{appState.user.name}</h2>
          <span>{appState.user.handle}</span>
          <p>{appState.user.bio}</p>
        </div>
      </article>

      <div className="profile-actions">
        <button type="button" onClick={onEditProfile}>
          <IconEdit />
          Profil bearbeiten
        </button>

        <button type="button" onClick={onResetDemo}>
          Demo zurücksetzen
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="section-head">
        <h2>Dein Roadbook wächst</h2>
        <span>kleine Ziele</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
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
        <p className="section-label">Beta Hinweis</p>
        <h2>Alles, was du hier einträgst, bleibt aktuell auf deinem Gerät.</h2>
        <p>
          Blechroute speichert diese Demo lokal im Browser. Echte Konten,
          Kommentare und gemeinsame Roadbooks kommen später mit dem Backend dazu.
        </p>
      </article>
    </section>
  );
}