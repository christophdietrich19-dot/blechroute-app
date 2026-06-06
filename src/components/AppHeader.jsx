import { IconMapPin } from "../icons/Icons";

export default function AppHeader({
  compact = false,
  userProfile,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu
}) {
  return (
    <header className={compact ? "app-header compact" : "app-header"}>
      <div className="brand-line">
        <div className="brand-center">
          <h1>Blechroute</h1>
          <p>{userProfile?.handle || "@christophdietrich19"}</p>
        </div>

        {userProfile?.avatar && (
          <img
            className="brand-avatar"
            src={userProfile.avatar}
            alt={userProfile.name || "Profil"}
          />
        )}
      </div>

      <div className="road-control-row" aria-label="Schnellnavigation">
        <button
          className={
            activePage === "discover"
              ? "road-control-button active"
              : "road-control-button"
          }
          type="button"
          onClick={onOpenMap}
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
        >
          <span>FEED</span>
        </button>

        <button className="road-control-button" type="button" onClick={onOpenMenu}>
          <span className="control-content">
            <span className="menu-lines">☰</span>
            MENU
          </span>
        </button>
      </div>
    </header>
  );
}