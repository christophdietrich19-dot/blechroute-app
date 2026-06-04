export default function AppHeader({
  compact = false,
  userProfile,
  activePage = "feed",
  onOpenFeed,
  onOpenMap,
  onOpenMenu
}) {
  return (
    <header className={compact ? "app-header compact" : "app-header"}>
      <div className="brand-center">
        <h1>Blechroute</h1>
        <p>{userProfile?.handle || "Roadbook"}</p>
      </div>

      <div className="road-control-row">
        <button
          className={
            activePage === "discover"
              ? "road-control-button active"
              : "road-control-button"
          }
          type="button"
          aria-label="Karte öffnen"
          onClick={onOpenMap}
        >
          <span>Map</span>
        </button>

        <button
          className={
            activePage === "feed"
              ? "road-control-button main-control active"
              : "road-control-button main-control"
          }
          type="button"
          aria-label="Feed öffnen"
          onClick={onOpenFeed}
        >
          <span>Feed</span>
        </button>

        <button
          className="road-control-button"
          type="button"
          aria-label="Menü öffnen"
          onClick={onOpenMenu}
        >
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
}