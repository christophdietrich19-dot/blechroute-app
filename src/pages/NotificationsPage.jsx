import StitchedBorder from "../components/StitchedBorder";
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
  onOpenMessages,
  onOpenNotifications,
  unreadMessages = 0,
  unreadNotifications = 0,
  onMarkRead,
  onMarkAllRead,
  onClearRead
}) {
  const notifications = appState.notifications || [];
  const readCount = notifications.length - unreadCount;

  return (
    <section className="screen-page notifications-page">
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

      <div className="welcome-block">
        <p className="section-label">Aktivität</p>
        <h2>Was rund um dein Roadbook passiert.</h2>
        <p>
          Kommentare, gespeicherte Beiträge, neue Follower und kleine Hinweise
          landen hier. Aktuell noch als lokale Beta.
        </p>
      </div>

      <div className="notification-stats">
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

      <div className="entry-list notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <article
              className={notification.read ? "notification-card is-read" : "notification-card is-unread"}
              key={notification.id}
            >
              <div className="notification-body">
                <span className="notification-icon" aria-hidden="true">
                  {getNotificationIcon(notification.type)}
                </span>

                <div className="notification-copy">
                  <p className="section-label">
                    {notification.read ? "Gelesen" : "Neu"} · {notification.time}
                  </p>
                  <h2>{notification.title}</h2>
                  <p>{notification.text}</p>
                </div>
              </div>

              {!notification.read && (
                <button
                  className="soft-action notification-read-action"
                  type="button"
                  onClick={() => onMarkRead(notification.id)}
                >
                  Als gelesen markieren
                </button>
              )}
            </article>
          ))
        ) : (
          <article className="note-card"><StitchedBorder />
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

      <article className="note-card"><StitchedBorder />
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
