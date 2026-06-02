import { useState } from "react";
import { imageOptions } from "../data/demoData";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import TextField from "./TextField";

export default function ProfileEditor({ user, onCancel, onSave }) {
  const [form, setForm] = useState(user);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name || !form.handle || !form.email) {
      setError("Name, Benutzername und E-Mail sind Pflichtfelder.");
      return;
    }

    onSave(form);
  }

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onCancel}>
      <form className="entry-form" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">Profil</p>
        <h2>Profil bearbeiten</h2>

        <TextField
          label="Name *"
          value={form.name}
          required
          onChange={(value) => update("name", value)}
        />

        <TextField
          label="Benutzername *"
          value={form.handle}
          required
          onChange={(value) => update("handle", value)}
        />

        <TextField
          label="E-Mail-Adresse *"
          value={form.email}
          type="email"
          required
          onChange={(value) => update("email", value)}
        />

        <TextField
          label="Region"
          value={form.region}
          onChange={(value) => update("region", value)}
        />

        <TextAreaField label="Bio" value={form.bio} onChange={(value) => update("bio", value)} />

        <SelectField label="Profilbild" value={form.avatar} onChange={(value) => update("avatar", value)}>
          {imageOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit">Profil speichern</button>
          <button className="ghost-button" type="button" onClick={onCancel}>
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}