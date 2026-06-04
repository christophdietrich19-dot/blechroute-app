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
  onGoToMoments,
  onGoToSaved,
  onGoToNotifications,
  onGoToProfile,
  onResetDemo
}) {
  return (
    <div className="create-overlay" role="presentation" onClick={onClose}>
      <div className="create-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">Menü</p>
        <h2>Blechroute steuern</h2>
        <p>
          Schnell zu deinen Bereichen springen, Aktivitäten prüfen oder einfach
          weiter im Roadbook stöbern.
        </p>

        <div className="create-options">
          <button
            type="button"
            onClick={() => {
              onGoToFeed();
              onClose();
            }}
          >
            <span>
              <IconHome />
            </span>
            <div>
              <strong>Feed</strong>
              <small>Zurück zu deinen Momenten und Community-Beiträgen</small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onGoToNotifications();
              onClose();
            }}
          >
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

          <button
            type="button"
            onClick={() => {
              onGoToDiscover();
              onClose();
            }}
          >
            <span>
              <IconMapPin />
            </span>
            <div>
              <strong>Map & Orte</strong>
              <small>Spots, Routen und Fundstücke entdecken</small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onGoToGarage();
              onClose();
            }}
          >
            <span>
              <IconGarage />
            </span>
            <div>
              <strong>Garage</strong>
              <small>Deine Fahrzeuge und Geschichten ansehen</small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onGoToMoments();
              onClose();
            }}
          >
            <span>
              <IconCamera />
            </span>
            <div>
              <strong>Momente</strong>
              <small>Polaroids, Erinnerungen und Roadbook-Beiträge</small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onGoToSaved();
              onClose();
            }}
          >
            <span>
              <IconBookmark />
            </span>
            <div>
              <strong>Gespeichert</strong>
              <small>{savedCount} gemerkte Beiträge im Roadbook</small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              onGoToProfile();
              onClose();
            }}
          >
            <span>
              <IconProfile />
            </span>
            <div>
              <strong>Profil</strong>
              <small>{user?.handle || "Dein Roadbook Profil öffnen"}</small>
            </div>
          </button>
        </div>

        <article
          style={{
            marginTop: "14px",
            padding: "14px",
            border: "1px solid rgba(216, 174, 103, 0.18)",
            borderRadius: "18px",
            background: "rgba(24, 9, 4, 0.42)"
          }}
        >
          <p className="section-label">Beta</p>
          <p
            style={{
              margin: "8px 0 0",
              color: "var(--paper-soft)",
              lineHeight: 1.45
            }}
          >
            Diese Version speichert lokal im Browser. Echte Konten, Cloud,
            Bilderupload und Community kommen später mit dem Backend.
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