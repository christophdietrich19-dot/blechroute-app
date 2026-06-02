import { IconCompass, IconBell } from "../icons/Icons";

export default function AppHeader({ compact = false, userProfile }) {
  return (
    <header className={compact ? "app-header compact" : "app-header"}>
      <div className="brand-topline">
        <button className="top-icon-button" type="button" aria-label="Karte öffnen">
          <IconCompass />
          <span>Map</span>
        </button>

        <div className="brand-center">
          <h1>Blechroute</h1>
          <p>{userProfile?.handle || "Momente, die bleiben."}</p>
        </div>

        <button className="top-icon-button" type="button" aria-label="Menü öffnen">
          <IconBell />
          <span>Menu</span>
        </button>
      </div>

      <div className="road-tab-row">
        <div className="road-tab-side" />
        <button className="road-tab active" type="button">
          Feed
        </button>
        <div className="road-tab-side" />
      </div>
    </header>
  );
}