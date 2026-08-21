import {
  IconCamera,
  IconGarage,
  IconBook,
  IconPlus,
  IconProfile
} from "../icons/Icons";

export default function BottomNavigation({ activePage, onChangePage, onOpenCreate }) {
  return (
    <nav className="bottom-nav" aria-label="Hauptnavigation">
      <button
        className={activePage === "feed" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("feed")}
        aria-current={activePage === "feed" ? "page" : undefined}
      >
        <IconBook />
        <span>Feed</span>
      </button>

      <button
        className={activePage === "garage" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("garage")}
        aria-current={activePage === "garage" ? "page" : undefined}
      >
        <IconGarage />
        <span>Garage</span>
      </button>

      <button
        className="create-button"
        type="button"
        onClick={onOpenCreate}
        aria-label="Neuen Eintrag erstellen"
        aria-haspopup="dialog"
      >
        <IconPlus />
      </button>

      <button
        className={activePage === "moments" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("moments")}
        aria-current={activePage === "moments" ? "page" : undefined}
      >
        <IconCamera />
        <span>Momente</span>
      </button>

      <button
        className={activePage === "profile" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("profile")}
        aria-current={activePage === "profile" ? "page" : undefined}
      >
        <IconProfile />
        <span>Profil</span>
      </button>
    </nav>
  );
}
