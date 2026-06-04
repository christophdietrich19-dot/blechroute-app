import AppHeader from "../components/AppHeader";
import { IconBookmark, IconGarage, IconHeart, IconMapPin } from "../icons/Icons";

function getNotificationIcon(type) {
  if (type === "saved") {
    return <IconBookmark />;
  }

  if (type === "garage") {
    return <IconGarage />;
  }

  if (type === "idea" || type === "roadbook") {
    return <IconMapPin />;
  }

  return <IconHeart />;
}

export default function NotificationsPage({
  appState,
  activePage,
  unreadCount,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onMarkRead,
  onMarkAllRead,
  onClearRead
}) {
  const notifications = appState.notifications || [];
  const readCount = notifications.length - unreadCount;

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

      <div className="welcome-block">
        <p className="section-label">Aktivität</p>
        <h2>Was rund um dein Roadbook passiert.</h2>
        <p>
          Kommentare, gespeicherte Beiträge, neue Follower und kleine Hinweise
          landen hier. Aktuell noch als lokale Beta.
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
          <strong>{notifications.length}</strong>
          <span>Gesamt</span>
        </article>

        <article className="stat-card">
          <strong>{unreadCount}</strong>
          <span>Neu</span>
        </article>

        <article className="stat-card">
          <strong>{readCount}</strong>
          <span>Gelesen</span>
        </article>
      </div>

      <div className="daily-actions">
        <button className="soft-action active" type="button" onClick={onMarkAllRead}>
          Alle gelesen
        </button>

        <button className="soft-action" type="button" onClick={onClearRead}>
          Gelesene entfernen
        </button>
      </div>

      <div className="section-head">
        <h2>Inbox</h2>
        <span>{unreadCount} ungelesen</span>
      </div>

      <div className="entry-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <article
              className="note-card"
              key={notification.id}
              style={{
                marginTop: 0,
                borderColor: notification.read
                  ? "rgba(216, 174, 103, 0.14)"
                  : "rgba(216, 174, 103, 0.42)",
                background: notification.read
                  ? "linear-gradient(145deg, rgba(70, 31, 13, 0.7), rgba(22, 9, 4, 0.72))"
                  : "radial-gradient(circle at top, rgba(255, 218, 154, 0.12), transparent 40%), linear-gradient(145deg, rgba(86, 38, 15, 0.92), rgba(22, 9, 4, 0.92))"
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "42px 1fr",
                  gap: "12px",
                  alignItems: "start"
                }}
              >
                <span
                  style={{
                    width: "42px",
                    height: "42px",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(216, 174, 103, 0.22)",
                    borderRadius: "15px",
                    color: "var(--gold-light)",
                    background: "rgba(216, 174, 103, 0.1)"
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </span>

                <div>
                  <p className="section-label">
                    {notification.read ? "Gelesen" : "Neu"} · {notification.time}
                  </p>
                  <h2>{notification.title}</h2>
                  <p>{notification.text}</p>
                </div>
              </div>

              {!notification.read && (
                <button
                  className="soft-action active"
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                  style={{
                    marginTop: "14px"
                  }}
                >
                  Als gelesen markieren
                </button>
              )}
            </article>
          ))
        ) : (
          <article className="note-card">
            <p className="section-label">Alles ruhig</p>
            <h2>Keine Aktivitäten vorhanden.</h2>
            <p>
              Wenn du Beiträge speicherst, Fahrzeuge änderst oder später echte
              Community Aktionen passieren, landet hier wieder etwas.
            </p>

            <button
              type="button"
              className="soft-action active"
              onClick={onOpenFeed}
              style={{
                marginTop: "14px"
              }}
            >
              Zurück zum Feed
            </button>
          </article>
        )}
      </div>

      <article className="note-card">
        <p className="section-label">Später</p>
        <h2>Das kann später deine echte Community Inbox werden.</h2>
        <p>
          Kommentare, neue Follower, Antworten, Spot Empfehlungen, Challenge
          Ergebnisse und Tour Einladungen passen hier sehr gut rein.
        </p>
      </article>
    </section>
  );
}