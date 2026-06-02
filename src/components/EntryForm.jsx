import { useState } from "react";
import { carImages, imageOptions } from "../data/demoData";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import TextField from "./TextField";

export default function EntryForm({ type, vehicles, onCancel, onSave }) {
  const initial = {
    title: "",
    subtitle: "",
    vehicle: vehicles[0]?.name || "BMW E39 528i",
    region: "",
    distance: "",
    duration: "",
    description: "",
    category: "Fotospot",
    image: carImages.bmwLake,
    visibility: "Öffentlich",
    year: "",
    engine: "",
    bodyType: ""
  };

  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const config = {
    tour: {
      label: "Neue Tour",
      titleLabel: "Titel *",
      titlePlaceholder: "Lausitzer Seenland Abendrunde",
      requiredFields: ["title", "region", "description"]
    },
    spot: {
      label: "Neuer Spot",
      titleLabel: "Name *",
      titlePlaceholder: "Bärwalder See Parkplatz",
      requiredFields: ["title", "region"]
    },
    moment: {
      label: "Neuer Moment",
      titleLabel: "Titel *",
      titlePlaceholder: "Sonnenuntergang am See",
      requiredFields: ["title", "description"]
    },
    vehicle: {
      label: "Neues Fahrzeug",
      titleLabel: "Fahrzeugname *",
      titlePlaceholder: "BMW E39 528i",
      requiredFields: ["title"]
    }
  }[type];

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const missingField = config.requiredFields.find((field) => !form[field]);

    if (missingField) {
      setError("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    onSave(type, form);
  }

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onCancel}>
      <form className="entry-form" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">{config.label}</p>
        <h2>Eintrag erstellen</h2>

        <TextField
          label={config.titleLabel}
          value={form.title}
          placeholder={config.titlePlaceholder}
          required
          onChange={(value) => update("title", value)}
        />

        {type !== "vehicle" && (
          <>
            <TextField
              label="Untertitel"
              value={form.subtitle}
              placeholder="Abendrunde, Nach dem Regen, Richtung Bautzen"
              onChange={(value) => update("subtitle", value)}
            />

            <TextField
              label={type === "moment" ? "Ort / Region" : "Ort / Region *"}
              value={form.region}
              placeholder="Lausitz"
              required={type !== "moment"}
              onChange={(value) => update("region", value)}
            />

            <SelectField
              label="Fahrzeug"
              value={form.vehicle}
              onChange={(value) => update("vehicle", value)}
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.name}>
                  {vehicle.name}
                </option>
              ))}
            </SelectField>
          </>
        )}

        {type === "tour" && (
          <>
            <TextField
              label="Kilometer"
              value={form.distance}
              placeholder="82 km"
              onChange={(value) => update("distance", value)}
            />

            <TextField
              label="Dauer"
              value={form.duration}
              placeholder="2 h 10 min"
              onChange={(value) => update("duration", value)}
            />
          </>
        )}

        {type === "spot" && (
          <SelectField
            label="Kategorie"
            value={form.category}
            onChange={(value) => update("category", value)}
          >
            <option>Fotospot</option>
            <option>Route</option>
            <option>Retro Moment</option>
            <option>Treffpunkt</option>
            <option>Roadbook</option>
          </SelectField>
        )}

        {type === "vehicle" && (
          <>
            <TextField
              label="Baujahr"
              value={form.year}
              placeholder="1998"
              onChange={(value) => update("year", value)}
            />

            <TextField
              label="Karosserie"
              value={form.bodyType}
              placeholder="Limousine"
              onChange={(value) => update("bodyType", value)}
            />

            <TextField
              label="Motor"
              value={form.engine}
              placeholder="2.8 R6"
              onChange={(value) => update("engine", value)}
            />
          </>
        )}

        <SelectField label="Bild" value={form.image} onChange={(value) => update("image", value)}>
          {imageOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>

        <TextAreaField
          label={type === "vehicle" ? "Story" : "Beschreibung *"}
          value={form.description}
          placeholder="Was soll von diesem Moment bleiben?"
          required={type !== "spot"}
          onChange={(value) => update("description", value)}
        />

        <SelectField
          label="Sichtbarkeit"
          value={form.visibility}
          onChange={(value) => update("visibility", value)}
        >
          <option>Öffentlich</option>
          <option>Privat</option>
        </SelectField>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit">Speichern</button>
          <button className="ghost-button" type="button" onClick={onCancel}>
            Abbrechen
          </button>
        </div>

        <small>* Pflichtfeld · lokale Beta-Speicherung</small>
      </form>
    </div>
  );
}