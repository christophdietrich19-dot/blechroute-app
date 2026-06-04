import { useState } from "react";

const statusOptions = [
  "Silberner Begleiter",
  "Kantig und echt",
  "Sonntagskind",
  "Neu in der Garage",
  "Projekt läuft",
  "Daily Driver",
  "Sommerauto",
  "Abgemeldet",
  "Verkauft"
];

const visibilityOptions = ["Öffentlich", "Privat", "Nur Freunde"];

export default function VehicleDetail({
  vehicle,
  onClose,
  onUpdateVehicle,
  onDeleteVehicle
}) {
  const [draft, setDraft] = useState({
    status: vehicle.status || "Neu in der Garage",
    visibility: vehicle.visibility || "Öffentlich",
    story: vehicle.story || ""
  });

  function handleSave() {
    onUpdateVehicle(vehicle.id, (currentVehicle) => ({
      ...currentVehicle,
      status: draft.status,
      visibility: draft.visibility,
      story: draft.story.trim() || "Noch keine Story hinterlegt."
    }));

    onClose();
  }

  function handleDelete() {
    const confirmDelete = window.confirm(
      `Soll "${vehicle.name}" wirklich aus der Garage entfernt werden?`
    );

    if (!confirmDelete) {
      return;
    }

    onDeleteVehicle(vehicle.id);
  }

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onClose}>
      <div
        className="entry-form"
        onClick={(event) => event.stopPropagation()}
        style={{
          alignSelf: "end"
        }}
      >
        <div className="sheet-handle" />

        <p className="section-label">Fahrzeugakte</p>
        <h2>{vehicle.name}</h2>
        <p>
          {vehicle.year} · {vehicle.type} · {vehicle.engine}
        </p>

        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={{
            width: "100%",
            aspectRatio: "4 / 3",
            objectFit: "contain",
            objectPosition: "center",
            padding: "10px",
            marginTop: "14px",
            border: "1px solid rgba(216, 174, 103, 0.18)",
            borderRadius: "20px",
            background:
              "radial-gradient(circle at 50% 42%, rgba(246, 231, 203, 0.09), transparent 45%), linear-gradient(145deg, rgba(30, 12, 5, 0.9), rgba(7, 3, 2, 0.9))"
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "9px",
            marginTop: "14px"
          }}
        >
          <article className="stat-card">
            <strong>{vehicle.year}</strong>
            <span>Baujahr</span>
          </article>

          <article className="stat-card">
            <strong>{vehicle.type}</strong>
            <span>Typ</span>
          </article>

          <article className="stat-card">
            <strong>{vehicle.visibility}</strong>
            <span>Sichtbar</span>
          </article>
        </div>

        <label>
          Status
          <select
            value={draft.status}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                status: event.target.value
              }))
            }
          >
            {statusOptions.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sichtbarkeit
          <select
            value={draft.visibility}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                visibility: event.target.value
              }))
            }
          >
            {visibilityOptions.map((visibility) => (
              <option value={visibility} key={visibility}>
                {visibility}
              </option>
            ))}
          </select>
        </label>

        <label>
          Story / Notiz
          <textarea
            value={draft.story}
            placeholder="Was macht dieses Auto besonders?"
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                story: event.target.value
              }))
            }
          />
        </label>

        <div className="form-actions">
          <button type="button" onClick={handleSave}>
            Speichern
          </button>

          <button className="ghost-button" type="button" onClick={onClose}>
            Schließen
          </button>
        </div>

        <button
          className="close-sheet"
          type="button"
          onClick={handleDelete}
          style={{
            marginTop: "10px",
            color: "#ffb3a8"
          }}
        >
          Fahrzeug löschen
        </button>

        <small>
          Diese Fahrzeugakte wird aktuell lokal in deinem Browser gespeichert.
        </small>
      </div>
    </div>
  );
}