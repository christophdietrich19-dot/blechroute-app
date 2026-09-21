import { IconBell, IconBook, IconMail, IconMapPin } from "../icons/Icons";

export default function AppHeader({
  compact = false,
  userProfile,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenMessages,
  onOpenNotifications,
  messageCount = 0,
  notificationCount = 0
}) {
  return (
    <>
      <header className={compact ? "app-header compact" : "app-header"}>
        <div className="brand-line">
          <div className="brand-center">
            <h1>Blechroute</h1>
            <p>{userProfile?.name || "Christoph"}</p>
          </div>

          <div className="header-utilities">
            <button
              className={activePage === "notifications" ? "active" : undefined}
              type="button"
              onClick={onOpenNotifications}
              aria-label="Benachrichtigungen öffnen"
              aria-current={activePage === "notifications" ? "page" : undefined}
            >
              <IconBell />
              {notificationCount > 0 && <span>{Math.min(notificationCount, 9)}</span>}
            </button>
            <button
              className={activePage === "messages" ? "active" : undefined}
              type="button"
              onClick={onOpenMessages}
              aria-label="Nachrichten öffnen"
              aria-current={activePage === "messages" ? "page" : undefined}
            >
              <IconMail />
              {messageCount > 0 && <span>{Math.min(messageCount, 9)}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className="road-control-sticky">
        <div className="road-control-row" aria-label="Schnellnavigation">
          <button
            className={
              activePage === "discover"
                ? "road-control-button active"
                : "road-control-button"
            }
            type="button"
            onClick={onOpenMap}
            aria-current={activePage === "discover" ? "page" : undefined}
          >
            <span className="control-content">
              <IconMapPin />
              MAP
            </span>
          </button>

          <button
            className={
              activePage === "feed"
                ? "road-control-button main-control active"
                : "road-control-button main-control"
            }
            type="button"
            onClick={onOpenFeed}
            aria-current={activePage === "feed" ? "page" : undefined}
          >
            <span className="control-content">
              <IconBook />
              FEED
            </span>
          </button>

          <button
            className="road-control-button"
            type="button"
            onClick={onOpenMenu}
            aria-label="Menü öffnen"
            aria-haspopup="dialog"
          >
            <span className="control-content">
              <span className="menu-lines" aria-hidden="true">☰</span>
              MENÜ
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
