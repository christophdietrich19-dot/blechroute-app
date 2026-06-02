import { IconBook, IconCamera, IconGarage, IconMapPin } from "../icons/Icons";

export default function CreateMenu({ onClose, onChoose }) {
  return (
    <div className="create-overlay" role="presentation" onClick={onClose}>
      <div className="create-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">Neuer Eintrag</p>
        <h2>Was bleibt von dieser Fahrt?</h2>
        <p>
          Füge eine Tour, einen Ort, einen Moment oder ein Fahrzeug zu deinem
          Roadbook hinzu.
        </p>

        <div className="create-options">
          <button type="button" onClick={() => onChoose("tour")}>
            <span>
              <IconBook />
            </span>
            <div>
              <strong>Neue Tour</strong>
              <small>Strecke, Fahrzeug, Bilder und Gefühl festhalten</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("spot")}>
            <span>
              <IconMapPin />
            </span>
            <div>
              <strong>Neuer Spot</strong>
              <small>Lieblingsort, Fotoplatz oder Pause speichern</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("moment")}>
            <span>
              <IconCamera />
            </span>
            <div>
              <strong>Neuer Moment</strong>
              <small>Ein Foto, ein Satz, eine Erinnerung</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("vehicle")}>
            <span>
              <IconGarage />
            </span>
            <div>
              <strong>Neues Fahrzeug</strong>
              <small>Auto in deiner Garage anlegen</small>
            </div>
          </button>
        </div>

        <button className="close-sheet" type="button" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}