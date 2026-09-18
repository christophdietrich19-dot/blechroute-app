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

    const cleanName = form.name.trim();
    const cleanHandle = form.handle.trim();
    const cleanEmail = form.email.trim().toLowerCase();

    if (!cleanName || !cleanHandle || !cleanEmail) {
      setError("Name, Benutzername und E-Mail sind Pflichtfelder.");
      return;
    }

    if (!/^@[a-zA-Z0-9._-]{3,30}$/.test(cleanHandle)) {
      setError("Der Benutzername muss mit @ beginnen und darf nur Buchstaben, Zahlen, Punkt, Unterstrich oder Bindestrich enthalten.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    onSave({
      ...form,
      name: cleanName.slice(0, 60),
      handle: cleanHandle,
      email: cleanEmail.slice(0, 120),
      region: String(form.region || "").trim().slice(0, 80),
      bio: String(form.bio || "").trim().slice(0, 500)
    });
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
          maxLength={60}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />

        <TextField
          label="Benutzername *"
          value={form.handle}
          required
          maxLength={31}
          autoComplete="username"
          onChange={(value) => update("handle", value)}
        />

        <TextField
          label="E-Mail-Adresse *"
          value={form.email}
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          onChange={(value) => update("email", value)}
        />

        <TextField
          label="Region"
          value={form.region}
          maxLength={80}
          autoComplete="address-level1"
          onChange={(value) => update("region", value)}
        />

        <TextAreaField label="Bio" value={form.bio} maxLength={500} onChange={(value) => update("bio", value)} />

        <SelectField
          label="Profilsichtbarkeit"
          value={form.profileVisibility || "Öffentlich"}
          onChange={(value) => update("profileVisibility", value)}
        >
          <option value="Öffentlich">Öffentlich</option>
          <option value="Privat">Privat · Folgeanfragen bestätigen</option>
        </SelectField>

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
