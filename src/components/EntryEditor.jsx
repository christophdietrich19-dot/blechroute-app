import { useState } from "react";
import { imageOptions } from "../data/demoData";

const visibilityOptions = ["Öffentlich", "Nur Freunde", "Privat"];

export default function EntryEditor({ entry, onCancel, onSave, onDelete }) {
  const [draft, setDraft] = useState({
    title: entry.title || "",
    subtitle: entry.subtitle || "",
    text: entry.text || "",
    location: entry.location || "",
    distance: entry.distance || "",
    duration: entry.duration || "",
    visibility: entry.visibility || "Öffentlich",
    image: entry.image || imageOptions[0]?.value || ""
  });

  const [error, setError] = useState("");

  function updateField(field, value) {
    setDraft((current) => ({
      ...current,
      [field]: value
    }));

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError("Bitte gib einen Titel ein.");
      return;
    }

    if (!draft.text.trim()) {
      setError("Bitte schreib eine kurze Beschreibung dazu.");
      return;
    }

    onSave({
      title: draft.title.trim(),
      subtitle: draft.subtitle.trim() || entry.subtitle,
      text: draft.text.trim(),
      location: draft.location.trim() || entry.location,
      distance: draft.distance.trim() || entry.distance,
      duration: draft.duration.trim() || entry.duration,
      visibility: draft.visibility,
      image: draft.image
    });
  }

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onCancel}>
      <form
        className="entry-form"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        style={{
          alignSelf: "end"
        }}
      >
        <div className="sheet-handle" />

        <p className="section-label">Eintrag bearbeiten</p>
        <h2>{entry.title}</h2>
        <p>
          Passe deinen Roadbook Eintrag an. Kommentare, Likes und Speicherungen
          bleiben erhalten.
        </p>

        <label>
          Titel *
          <input
            value={draft.title}
            type="text"
            placeholder="Titel des Eintrags"
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        <label>
          Untertitel
          <input
            value={draft.subtitle}
            type="text"
            placeholder="zum Beispiel: Abendrunde"
            onChange={(event) => updateField("subtitle", event.target.value)}
          />
        </label>

        <label>
          Beschreibung *
          <textarea
            value={draft.text}
            placeholder="Was möchtest du zu diesem Eintrag festhalten?"
            onChange={(event) => updateField("text", event.target.value)}
          />
        </label>

        <label>
          Ort / Region
          <input
            value={draft.location}
            type="text"
            placeholder="zum Beispiel: Lausitz"
            onChange={(event) => updateField("location", event.target.value)}
          />
        </label>

        {entry.type === "Tour" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px"
            }}
          >
            <label>
              Strecke
              <input
                value={draft.distance}
                type="text"
                placeholder="82 km"
                onChange={(event) => updateField("distance", event.target.value)}
              />
            </label>

            <label>
              Dauer
              <input
                value={draft.duration}
                type="text"
                placeholder="2 h 10 min"
                onChange={(event) => updateField("duration", event.target.value)}
              />
            </label>
          </div>
        )}

        <label>
          Bild
          <select
            value={draft.image}
            onChange={(event) => updateField("image", event.target.value)}
          >
            {imageOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {draft.image && (
          <div
            style={{
              marginTop: "12px",
              border: "1px solid rgba(216, 174, 103, 0.18)",
              borderRadius: "18px",
              overflow: "hidden",
              background: "rgba(24, 9, 4, 0.4)"
            }}
          >
            <img
              src={draft.image}
              alt={draft.title || "Vorschau"}
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                objectFit: "cover"
              }}
            />
          </div>
        )}

        <label>
          Sichtbarkeit
          <select
            value={draft.visibility}
            onChange={(event) => updateField("visibility", event.target.value)}
          >
            {visibilityOptions.map((visibility) => (
              <option value={visibility} key={visibility}>
                {visibility}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit">Speichern</button>

          <button className="ghost-button" type="button" onClick={onCancel}>
            Abbrechen
          </button>
        </div>

        <button
          className="close-sheet"
          type="button"
          onClick={onDelete}
          style={{
            marginTop: "10px",
            color: "#ffb3a8"
          }}
        >
          Eintrag löschen
        </button>

        <small>
          Änderungen werden aktuell lokal in deinem Browser gespeichert.
        </small>
      </form>
    </div>
  );
}