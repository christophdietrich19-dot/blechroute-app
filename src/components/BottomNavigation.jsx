import {
  IconCamera,
  IconGarage,
  IconHome,
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
      >
        <IconHome />
        <span>Feed</span>
      </button>

      <button
        className={activePage === "garage" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("garage")}
      >
        <IconGarage />
        <span>Garage</span>
      </button>

      <button className="create-button" type="button" onClick={onOpenCreate}>
        <IconPlus />
      </button>

      <button
        className={activePage === "discover" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("discover")}
      >
        <IconCamera />
        <span>Momente</span>
      </button>

      <button
        className={activePage === "profile" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("profile")}
      >
        <IconProfile />
        <span>Profil</span>
      </button>
    </nav>
  );
}