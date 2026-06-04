import { useMemo, useState } from "react";
import { imageOptions } from "../data/demoData";

const visibilityOptions = ["Öffentlich", "Nur Freunde", "Privat"];

const spotCategories = [
  "Fotospot",
  "Route",
  "Retro Moment",
  "Roadbook",
  "Aussicht",
  "See",
  "Waschbox",
  "Treffen",
  "Werkstatt"
];

const vehicleTypes = [
  "Limousine",
  "Kombi",
  "Coupé",
  "Projekt",
  "Klassiker",
  "Daily Driver",
  "Sommerauto",
  "Sonstiges"
];

const formCopy = {
  moment: {
    label: "Moment",
    title: "Moment festhalten",
    text:
      "Halte einen kleinen Augenblick fest. Kein perfekter Beitrag, eher ein Polaroid mit Gefühl.",
    titleLabel: "Titel *",
    titlePlaceholder: "zum Beispiel: Abendlicht am See",
    descriptionLabel: "Text zum Moment *",
    descriptionPlaceholder:
      "Was war an diesem Moment besonders? Licht, Ort, Gefühl, Auto..."
  },
  tour: {
    label: "Tour",
    title: "Tour anlegen",
    text:
      "Speichere eine Fahrt für dein Roadbook. Strecke, Fahrzeug und das, was hängen geblieben ist.",
    titleLabel: "Name der Tour *",
    titlePlaceholder: "zum Beispiel: Abendrunde Lausitzer Seenland",
    descriptionLabel: "Beschreibung *",
    descriptionPlaceholder:
      "Wie war die Strecke? Was war schön? Warum bleibt diese Tour?"
  },
  spot: {
    label: "Spot",
    title: "Spot speichern",
    text:
      "Lege einen Ort ab, an den du zurück willst. Später kann daraus ein echter Kartenpunkt werden.",
    titleLabel: "Name des Spots *",
    titlePlaceholder: "zum Beispiel: Parkplatz am See",
    descriptionLabel: "Notiz zum Ort *",
    descriptionPlaceholder:
      "Was macht diesen Ort gut? Licht, Ruhe, Aussicht, Zufahrt..."
  },
  vehicle: {
    label: "Garage",
    title: "Fahrzeug hinzufügen",
    text:
      "Lege ein Auto in deine Garage. Später hängen Touren, Bilder und Erinnerungen direkt daran.",
    titleLabel: "Fahrzeugname *",
    titlePlaceholder: "zum Beispiel: BMW E39 528i",
    descriptionLabel: "Story / Notiz *",
    descriptionPlaceholder:
      "Was macht dieses Auto besonders? Zustand, Geschichte, Plan..."
  }
};

function getInitialForm(type, vehicles) {
  return {
    title: "",
    subtitle: "",
    description: "",
    vehicle: vehicles[0]?.name || "",
    region: "",
    distance: "",
    duration: "",
    category: spotCategories[0],
    year: "",
    bodyType: vehicleTypes[0],
    engine: "",
    image: imageOptions[0]?.value || "",
    visibility: visibilityOptions[0]
  };
}

export default function EntryForm({ type, vehicles, onCancel, onSave }) {
  const copy = formCopy[type] || formCopy.tour;

  const [form, setForm] = useState(() => getInitialForm(type, vehicles));
  const [error, setError] = useState("");

  const selectedImageLabel = useMemo(() => {
    const match = imageOptions.find((option) => option.value === form.image);
    return match?.label || "Bild";
  }, [form.image]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));

    if (error) {
      setError("");
    }
  }

  function validateForm() {
    if (!form.title.trim()) {
      return "Bitte gib einen Titel ein.";
    }

    if (!form.description.trim()) {
      return "Bitte schreib eine kurze Beschreibung dazu.";
    }

    if (type !== "vehicle" && !form.vehicle.trim()) {
      return "Bitte wähle ein Fahrzeug aus.";
    }

    if (type === "vehicle") {
      if (!form.year.trim()) {
        return "Bitte gib ein Baujahr oder eine grobe Angabe ein.";
      }

      if (!form.engine.trim()) {
        return "Bitte gib einen Motor oder eine kurze technische Angabe ein.";
      }
    }

    if (type === "spot" && !form.region.trim()) {
      return "Bitte gib eine Region oder einen Ort an.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    onSave(type, {
      ...form,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      description: form.description.trim(),
      region: form.region.trim(),
      distance: form.distance.trim(),
      duration: form.duration.trim(),
      year: form.year.trim(),
      engine: form.engine.trim()
    });
  }

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onCancel}>
      <form className="entry-form" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />

        <p className="section-label">{copy.label}</p>
        <h2>{copy.title}</h2>
        <p>{copy.text}</p>

        <label>
          {copy.titleLabel}
          <input
            value={form.title}
            type="text"
            placeholder={copy.titlePlaceholder}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </label>

        {type !== "vehicle" && (
          <label>
            Kurzer Untertitel
            <input
              value={form.subtitle}
              type="text"
              placeholder={
                type === "moment"
                  ? "zum Beispiel: nach dem Regen"
                  : type === "spot"
                    ? "zum Beispiel: ruhiger Parkplatz"
                    : "zum Beispiel: Abendrunde"
              }
              onChange={(event) => updateField("subtitle", event.target.value)}
            />
          </label>
        )}

        {type !== "vehicle" && (
          <label>
            Fahrzeug *
            <select
              value={form.vehicle}
              onChange={(event) => updateField("vehicle", event.target.value)}
            >
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <option value={vehicle.name} key={vehicle.id}>
                    {vehicle.name}
                  </option>
                ))
              ) : (
                <option value="">Noch kein Fahrzeug vorhanden</option>
              )}
            </select>
          </label>
        )}

        {type === "vehicle" && (
          <>
            <label>
              Baujahr *
              <input
                value={form.year}
                type="text"
                placeholder="zum Beispiel: 1998"
                onChange={(event) => updateField("year", event.target.value)}
              />
            </label>

            <label>
              Fahrzeugtyp
              <select
                value={form.bodyType}
                onChange={(event) => updateField("bodyType", event.target.value)}
              >
                {vehicleTypes.map((vehicleType) => (
                  <option value={vehicleType} key={vehicleType}>
                    {vehicleType}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Motor / Technik *
              <input
                value={form.engine}
                type="text"
                placeholder="zum Beispiel: 2.8 R6, 1.3 NZ, 3.0 TDI"
                onChange={(event) => updateField("engine", event.target.value)}
              />
            </label>
          </>
        )}

        {type === "spot" && (
          <label>
            Kategorie
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
            >
              {spotCategories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        )}

        {(type === "spot" || type === "tour" || type === "moment") && (
          <label>
            Ort / Region {type === "spot" ? "*" : ""}
            <input
              value={form.region}
              type="text"
              placeholder={
                type === "spot"
                  ? "zum Beispiel: Bärwalder See"
                  : "zum Beispiel: Lausitz"
              }
              onChange={(event) => updateField("region", event.target.value)}
            />
          </label>
        )}

        {type === "tour" && (
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
                value={form.distance}
                type="text"
                placeholder="82 km"
                onChange={(event) => updateField("distance", event.target.value)}
              />
            </label>

            <label>
              Dauer
              <input
                value={form.duration}
                type="text"
                placeholder="2 h 10 min"
                onChange={(event) => updateField("duration", event.target.value)}
              />
            </label>
          </div>
        )}

        <label>
          {copy.descriptionLabel}
          <textarea
            value={form.description}
            placeholder={copy.descriptionPlaceholder}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </label>

        <label>
          Bild
          <select
            value={form.image}
            onChange={(event) => updateField("image", event.target.value)}
          >
            {imageOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {form.image && (
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
              src={form.image}
              alt={selectedImageLabel}
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                objectFit: type === "vehicle" ? "contain" : "cover",
                padding: type === "vehicle" ? "10px" : 0,
                background:
                  type === "vehicle"
                    ? "radial-gradient(circle at 50% 42%, rgba(246, 231, 203, 0.09), transparent 45%), linear-gradient(145deg, rgba(30, 12, 5, 0.9), rgba(7, 3, 2, 0.9))"
                    : "transparent"
              }}
            />
          </div>
        )}

        <label>
          Sichtbarkeit
          <select
            value={form.visibility}
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

        <small>
          Diese Beta speichert alles lokal in deinem Browser. Echte Konten und
          Uploads kommen später mit dem Backend.
        </small>
      </form>
    </div>
  );
}