import {
  IconCamera,
  IconGarage,
  IconMenu,
  IconPlus,
  IconProfile
} from "../icons/Icons";

export default function BottomNavigation({ activePage, menuOpen, onChangePage, onOpenCreate, onOpenMenu }) {
  return (
    <nav className="bottom-nav" aria-label="Hauptnavigation">
      <button
        className={menuOpen ? "nav-item active" : "nav-item"}
        type="button"
        onClick={onOpenMenu}
        aria-label="Menü öffnen"
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
      >
        <IconMenu />
        <span>Menü</span>
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
