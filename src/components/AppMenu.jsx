import "../styles/community.css";

import {
  IconBookmark,
  IconCamera,
  IconGarage,
  IconHeart,
  IconHome,
  IconMapPin,
  IconProfile
} from "../icons/Icons";

export default function AppMenu({
  user,
  savedCount = 0,
  unreadCount = 0,
  onClose,
  onGoToFeed,
  onGoToDiscover,
  onGoToGarage,
  onGoToCommunity,
  onGoToMoments,
  onGoToSaved,
  onGoToNotifications,
  onGoToProfile,
  onResetDemo
}) {
  function goToPage(callback) {
    callback();
    onClose();
  }

  return (
    <div className="create-overlay" role="presentation" onClick={onClose}>
      <div
        className="create-sheet app-menu-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Blechroute Menü"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />

        <p className="section-label">Menü</p>
        <h2>Blechroute steuern</h2>
        <p>
          Spring direkt in die wichtigsten Bereiche oder öffne die Community.
        </p>

        <div className="app-menu-feature">
          <button type="button" onClick={() => goToPage(onGoToCommunity)}>
            <span>
              <IconProfile />
            </span>

            <div>
              <strong>Community</strong>
              <small>Freunde, Profile, Garagen und Bilder ansehen</small>
            </div>
          </button>
        </div>

        <div className="app-menu-group-label">Navigation</div>

        <div className="create-options app-menu-options">
          <button type="button" onClick={() => goToPage(onGoToFeed)}>
            <span>
              <IconHome />
            </span>

            <div>
              <strong>Feed</strong>
              <small>Zurück zu deinen Momenten und Community-Beiträgen</small>
            </div>
          </button>

          <button type="button" onClick={() => goToPage(onGoToDiscover)}>
            <span>
              <IconMapPin />
            </span>

            <div>
              <strong>Map & Orte</strong>
              <small>Spots, Routen und Fundstücke entdecken</small>
            </div>
          </button>

          <button type="button" onClick={() => goToPage(onGoToGarage)}>
            <span>
              <IconGarage />
            </span>

            <div>
              <strong>Garage</strong>
              <small>Deine Fahrzeuge und Geschichten ansehen</small>
            </div>
          </button>

          <button type="button" onClick={() => goToPage(onGoToMoments)}>
            <span>
              <IconCamera />
            </span>

            <div>
              <strong>Momente</strong>
              <small>Polaroids, Erinnerungen und Roadbook-Beiträge</small>
            </div>
          </button>
        </div>

        <div className="app-menu-group-label">Persönlich</div>

        <div className="create-options app-menu-options">
          <button type="button" onClick={() => goToPage(onGoToNotifications)}>
            <span>
              <IconHeart />
            </span>

            <div>
              <strong>Aktivität</strong>
              <small>
                {unreadCount > 0
                  ? `${unreadCount} neue Meldungen`
                  : "Keine neuen Meldungen"}
              </small>
            </div>
          </button>

          <button type="button" onClick={() => goToPage(onGoToSaved)}>
            <span>
              <IconBookmark />
            </span>

            <div>
              <strong>Gespeichert</strong>
              <small>{savedCount} gemerkte Beiträge im Roadbook</small>
            </div>
          </button>

          <button type="button" onClick={() => goToPage(onGoToProfile)}>
            <span>
              <IconProfile />
            </span>

            <div>
              <strong>Profil</strong>
              <small>{user?.handle || "Dein Roadbook Profil öffnen"}</small>
            </div>
          </button>
        </div>

        <article className="app-menu-beta-card">
          <p className="section-label">Beta</p>
          <p>
            Diese Version speichert lokal im Browser. Echte Konten, Cloud,
            Bilderupload und offene Community kommen später mit dem Backend.
          </p>
        </article>

        <button
          className="close-sheet"
          type="button"
          onClick={() => {
            onResetDemo();
            onClose();
          }}
        >
          Demo zurücksetzen
        </button>

        <button className="close-sheet" type="button" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}
