export default function AppHeader({
  compact = false,
  userProfile,
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
          className="road-control-button"
          type="button"
          aria-label="Karte öffnen"
          onClick={onOpenMap}
        >
          <span>Map</span>
        </button>

        <button className="road-control-button main-control active" type="button">
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