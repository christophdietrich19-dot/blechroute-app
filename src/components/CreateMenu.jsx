import {
  IconCamera,
  IconGarage,
  IconMapPin,
  IconPlus
} from "../icons/Icons";

export default function CreateMenu({ onClose, onChoose }) {
  return (
    <div className="create-overlay" role="presentation" onClick={onClose}>
      <div className="create-sheet" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">Neuer Eintrag</p>
        <h2>Was möchtest du festhalten?</h2>
        <p>
          Blechroute sammelt nicht einfach Posts. Es geht um Fahrzeuge, Orte,
          Touren und diese kleinen Momente, die später wieder auftauchen sollen.
        </p>

        <div className="create-options">
          <button type="button" onClick={() => onChoose("moment")}>
            <span>
              <IconCamera />
            </span>

            <div>
              <strong>Moment festhalten</strong>
              <small>Ein Foto, ein kurzer Text, ein Polaroid fürs Roadbook</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("tour")}>
            <span>
              <IconPlus />
            </span>

            <div>
              <strong>Tour anlegen</strong>
              <small>Strecke, Fahrzeug, Dauer und Gefühl der Fahrt speichern</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("spot")}>
            <span>
              <IconMapPin />
            </span>

            <div>
              <strong>Spot speichern</strong>
              <small>Ort, Kategorie und kleine Notiz für später merken</small>
            </div>
          </button>

          <button type="button" onClick={() => onChoose("vehicle")}>
            <span>
              <IconGarage />
            </span>

            <div>
              <strong>Fahrzeug hinzufügen</strong>
              <small>Auto in deine Garage legen und mit Story versehen</small>
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