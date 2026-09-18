import { useState } from "react";

const reportReasons = [
  "Spam oder Werbung",
  "Beleidigung oder Belästigung",
  "Gefährliches Verhalten",
  "Privatsphäre oder Standort",
  "Urheberrecht oder fremdes Bild",
  "Anderer Grund"
];

export default function ModerationSheet({ target, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!reason) {
      setError("Bitte wähle einen Grund aus.");
      return;
    }

    onSubmit({
      target,
      reason,
      details: details.trim().slice(0, 500)
    });
  }

  return (
    <div className="create-overlay form-overlay moderation-overlay" role="presentation" onClick={onClose}>
      <form
        className="entry-form moderation-sheet"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <p className="section-label">Sicherheit</p>
        <h2>Inhalt melden</h2>
        <p>
          Du meldest: <strong>{target?.label || "Community-Inhalt"}</strong>
        </p>

        <label>
          Grund *
          <select value={reason} onChange={(event) => setReason(event.target.value)}>
            <option value="">Bitte auswählen</option>
            {reportReasons.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Zusätzliche Hinweise
          <textarea
            value={details}
            maxLength={500}
            placeholder="Keine persönlichen Daten eintragen."
            onChange={(event) => setDetails(event.target.value)}
          />
          <small>{details.length}/500 Zeichen</small>
        </label>

        {error && <p className="form-error">{error}</p>}

        <article className="public-notice-card">
          <strong>Noch keine Übertragung</strong>
          <p>
            Ohne Backend wird diese Meldung nur lokal vorgemerkt. Vor einer
            öffentlichen Community muss sie an ein Moderationssystem übertragen werden.
          </p>
        </article>

        <div className="form-actions">
          <button type="submit">Lokal vormerken</button>
          <button className="ghost-button" type="button" onClick={onClose}>Abbrechen</button>
        </div>
      </form>
    </div>
  );
}
