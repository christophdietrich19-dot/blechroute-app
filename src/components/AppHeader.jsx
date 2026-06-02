import { IconBell } from "../icons/Icons";

export default function AppHeader({ compact = false, userProfile }) {
  return (
    <header className={compact ? "app-header compact" : "app-header"}>
      <div className="brand-block">
        <div className="brand-mark">B</div>

        <div>
          <h1>Blechroute</h1>
          <p>{userProfile?.handle || "Momente, die bleiben."}</p>
        </div>
      </div>

      <button className="round-button" type="button" aria-label="Benachrichtigungen">
        <IconBell />
      </button>
    </header>
  );
}