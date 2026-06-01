import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "blechroute-beta-009";
const basePath = import.meta.env.BASE_URL;

const carImages = {
  bmwE39: `${basePath}bmw_sedan_bei_sonnenuntergang.png`,
  golf2: `${basePath}volkswagen_golf_bei_sonnenuntergang.png`,
  audi80: `${basePath}audi_bei_sonnenuntergang_auf_landstrasse.png`,
  bmwLake: `${basePath}bmw_am_see_im_goldenen_licht.png`
};

const defaultUser = {
  name: "Christoph",
  handle: "@christophdietrich19",
  email: "demo@blechroute.de",
  region: "Lausitz",
  bio: "Alte Autos, ruhige Straßen und Erinnerungen, die bleiben.",
  avatar: carImages.bmwLake
};

const defaultVehicles = [
  {
    id: 1,
    name: "BMW E39 528i",
    year: "1998",
    type: "Limousine",
    engine: "2.8 R6",
    status: "Silberner Begleiter",
    image: carImages.bmwE39,
    story:
      "Kein lauter Auftritt. Eher dieses ruhige, ehrliche Gefühl alter BMW-Limousinen.",
    visibility: "Öffentlich"
  },
  {
    id: 2,
    name: "VW Golf 2",
    year: "1989",
    type: "Projekt",
    engine: "1.3 NZ",
    status: "Kantig und echt",
    image: carImages.golf2,
    story:
      "Ein Auto, das nicht perfekt sein muss. Hauptsache es erzählt etwas.",
    visibility: "Öffentlich"
  },
  {
    id: 3,
    name: "Audi 80 B4",
    year: "1994",
    type: "Klassiker",
    engine: "2.8 V6",
    status: "Sonntagskind",
    image: carImages.audi80,
    story: "Ruhige Linie, weicher Klang und dieses alte Audi-Gefühl.",
    visibility: "Öffentlich"
  }
];

const defaultRoadbookEntries = [
  {
    id: 1,
    title: "Lausitzer Seenland",
    subtitle: "Abendrunde",
    type: "Tour",
    vehicle: "BMW E39 528i",
    date: "31. Mai",
    distance: "82 km",
    duration: "2 h 10 min",
    location: "Lausitz",
    likes: 42,
    saved: 18,
    image: carImages.bmwLake,
    text:
      "Goldenes Licht über dem Wasser, leere Straßen und dieses leise Gefühl, dass genau solche Fahrten bleiben.",
    visibility: "Öffentlich"
  },
  {
    id: 2,
    title: "Tankstellenlicht",
    subtitle: "Nach dem Regen",
    type: "Moment",
    vehicle: "VW Golf 2",
    date: "29. Mai",
    distance: "18 km",
    duration: "kurzer Halt",
    location: "Hoyerswerda",
    likes: 28,
    saved: 9,
    image: carImages.golf2,
    text:
      "Eigentlich nur kurz anhalten. Dann war da dieses Licht auf dem alten Lack.",
    visibility: "Öffentlich"
  },
  {
    id: 3,
    title: "Waldstraße",
    subtitle: "Richtung Bautzen",
    type: "Spot",
    vehicle: "Audi 80 B4",
    date: "27. Mai",
    distance: "43 km",
    duration: "1 h 05 min",
    location: "Oberlausitz",
    likes: 63,
    saved: 21,
    image: carImages.audi80,
    text:
      "Schmal, ruhig, leicht feucht. Kein Stress. Nur Wald, Straße und ein Auto, das sich richtig anfühlt.",
    visibility: "Öffentlich"
  }
];

const defaultSpots = [
  {
    id: 1,
    title: "Bärwalder See",
    category: "Fotospot",
    meta: "Wasser · Sonnenuntergang · ruhige Parkplätze",
    score: "4.8",
    image: carImages.bmwLake,
    visibility: "Öffentlich"
  },
  {
    id: 2,
    title: "Klassikerblick",
    category: "Retro Moment",
    meta: "Golf 2 · Abendlicht · ruhige Aussicht",
    score: "4.6",
    image: carImages.golf2,
    visibility: "Öffentlich"
  },
  {
    id: 3,
    title: "Waldkurve",
    category: "Route",
    meta: "Landstraße · ruhig · perfekt nach Regen",
    score: "4.9",
    image: carImages.audi80,
    visibility: "Öffentlich"
  },
  {
    id: 4,
    title: "E39 Spot",
    category: "Roadbook",
    meta: "Silber · Abendlicht · sauberer Auftritt",
    score: "4.7",
    image: carImages.bmwE39,
    visibility: "Öffentlich"
  }
];

const defaultPolaroids = [
  {
    id: 1,
    title: "E39 am Abend",
    caption: "Ruhiges Licht, ruhige Straße, genau mein Ding.",
    place: "Abendrunde",
    image: carImages.bmwE39
  },
  {
    id: 2,
    title: "Golf 2 Moment",
    caption: "Klassisch, ehrlich und sofort erkennbar.",
    place: "Bergstraße",
    image: carImages.golf2
  },
  {
    id: 3,
    title: "Audi unterwegs",
    caption: "Saubere Linie und genau der richtige Vibe.",
    place: "Landstraße",
    image: carImages.audi80
  }
];

const tasks = [
  {
    id: 1,
    title: "Erste Tour ins Roadbook schreiben",
    text: "Halte Strecke, Auto und Gefühl fest.",
    progress: 100
  },
  {
    id: 2,
    title: "5 Orte sammeln",
    text: "Lieblingsplätze für später bewahren.",
    progress: 60
  },
  {
    id: 3,
    title: "Ein Polaroid-Moment",
    text: "Ein Foto, ein Satz, eine Erinnerung.",
    progress: 40
  }
];

const imageOptions = [
  { label: "BMW E39 Abend", value: carImages.bmwE39 },
  { label: "Golf 2", value: carImages.golf2 },
  { label: "Audi 80 B4", value: carImages.audi80 },
  { label: "BMW am See", value: carImages.bmwLake }
];

function makeId() {
  return Date.now() + Math.floor(Math.random() * 9999);
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short"
  }).format(new Date());
}

function loadStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  } catch {
    return null;
  }
}

function createDefaultState() {
  return {
    loggedIn: false,
    guestMode: true,
    user: defaultUser,
    vehicles: defaultVehicles,
    entries: defaultRoadbookEntries,
    spots: defaultSpots,
    polaroids: defaultPolaroids
  };
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M9.5 20v-5.8h5V20" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.4 8.6-2 4.8-4.8 2 2-4.8 4.8-2Z" />
    </svg>
  );
}

function IconGarage() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 10 12 5l8.5 5" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M8 20v-5.5h8V20" />
      <path d="M9 12.2h6" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.4-4 4.2-6 7-6s5.6 2 7 6" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h10a4 4 0 0 1 4 4v12H8a3 3 0 0 1-3-3V4Z" />
      <path d="M8 4v13h11" />
      <path d="M10 8h5" />
      <path d="M10 11h4" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 8.7c0 5.1-8.5 10.1-8.5 10.1S3.5 13.8 3.5 8.7A4.35 4.35 0 0 1 12 7.1a4.35 4.35 0 0 1 8.5 1.6Z" />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10v16l-5-3-5 3V4Z" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h4l1.5-2h5L16 8h4v11H4V8Z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.2" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 9.5a6 6 0 0 0-12 0c0 7-2 7-2 7h16s-2 0-2-7Z" />
      <path d="M9.5 19a2.7 2.7 0 0 0 5 0" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

function AppHeader({ compact = false, userProfile }) {
  return (
    <header className={compact ? "app-header compact" : "app-header"}>
      <div className="brand-block">
        <div className="brand-mark">B</div>
        <div>
          <h1>Blechroute</h1>
          <p>{userProfile?.handle || "Momente, die bleiben."}</p>
        </div>
      </div>

      <button className="round-button" type="button" aria-label="Benachrichtigungen">
        <IconBell />
      </button>
    </header>
  );
}

function DailyHighlight({ moment }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="daily-highlight">
      <div className="daily-polaroid">
        <img src={moment.image} alt={moment.headline} />
        <div>
          <h3>{moment.headline}</h3>
          <p>{moment.text}</p>
          <span>{moment.place}</span>
        </div>
      </div>

      <div className="daily-copy">
        <p className="section-label">{moment.title}</p>
        <h2>Dieser Moment bleibt.</h2>
        <p>
          Von {moment.author}. Ausgewählt, weil manchmal ein Bild reicht, um eine
          ganze Fahrt wieder zu fühlen.
        </p>

        <div className="daily-actions">
          <button
            className={liked ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setLiked((current) => !current)}
          >
            <IconHeart />
            <span>{liked ? "Behalten" : "Gefällt"}</span>
          </button>

          <button
            className={saved ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setSaved((current) => !current)}
          >
            <IconBookmark />
            <span>{saved ? "Gespeichert" : "Speichern"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function WeeklyCarCard({ car }) {
  return (
    <article className="weekly-car">
      <img src={car.image} alt={car.headline} />
      <div>
        <p className="section-label">{car.title}</p>
        <h2>{car.headline}</h2>
        <p>{car.text}</p>
        <span>
          {car.author} · {car.place}
        </span>
      </div>
    </article>
  );
}

function RoadbookCard({ entry, featured = false }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className={featured ? "roadbook-card featured" : "roadbook-card"}>
      <div className="roadbook-image">
        <img src={entry.image} alt={entry.title} />
        <span className="paper-label">{entry.type}</span>
        <span className="date-stamp">{entry.date}</span>
      </div>

      <div className="roadbook-content">
        <p className="section-label">{entry.subtitle}</p>
        <h2>{entry.title}</h2>
        <p>{entry.text}</p>

        <div className="roadbook-meta">
          <span>{entry.vehicle}</span>
          <span>{entry.distance}</span>
          <span>{entry.duration}</span>
          <span>{entry.visibility}</span>
        </div>

        <div className="roadbook-actions">
          <button
            className={liked ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setLiked((current) => !current)}
          >
            <IconHeart />
            <span>{liked ? entry.likes + 1 : entry.likes}</span>
          </button>

          <button
            className={saved ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setSaved((current) => !current)}
          >
            <IconBookmark />
            <span>{saved ? entry.saved + 1 : entry.saved}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function PolaroidCard({ item, tilted }) {
  return (
    <article className={tilted ? "polaroid tilted" : "polaroid"}>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.caption}</p>
        <span>{item.place}</span>
      </div>
    </article>
  );
}

function FeedPage({ appState }) {
  const { user, entries, polaroids, vehicles } = appState;
  const featuredEntry = entries[0] || defaultRoadbookEntries[0];
  const weeklyVehicle = vehicles[0] || defaultVehicles[0];

  const dailyMoment = {
    title: "Moment des Tages",
    headline: polaroids[0]?.title || "Sonnenuntergang am See",
    author: user.handle,
    place: polaroids[0]?.place || user.region,
    text: polaroids[0]?.caption || "Nur kurz angehalten. Am Ende war es genau dieses Bild.",
    image: polaroids[0]?.image || carImages.bmwLake
  };

  const weeklyCar = {
    title: "Blech der Woche",
    headline: weeklyVehicle.name,
    author: user.handle,
    place: user.region,
    text: weeklyVehicle.story,
    image: weeklyVehicle.image
  };

  return (
    <section className="screen-page">
      <AppHeader userProfile={user} />

      <div className="welcome-block">
        <p className="section-label">Roadbook</p>
        <h2>Guten Abend, {user.name}.</h2>
        <p>Schön, dass du wieder da bist. Welche Erinnerung bleibt heute?</p>
      </div>

      <DailyHighlight moment={dailyMoment} />

      <div className="section-head">
        <h2>Gespeicherte Momente</h2>
        <span>kleine Augenblicke</span>
      </div>

      <div className="polaroid-row">
        {polaroids.map((item, index) => (
          <PolaroidCard item={item} tilted={index === 1} key={item.id} />
        ))}
      </div>

      <div className="section-head">
        <h2>Blech der Woche</h2>
        <span>aus der Garage</span>
      </div>

      <WeeklyCarCard car={weeklyCar} />

      <div className="section-head">
        <h2>Empfohlene Tour</h2>
        <span>aus der Community</span>
      </div>

      <RoadbookCard entry={featuredEntry} featured />

      <div className="section-head">
        <h2>Aus der Community</h2>
        <span>ruhige Fundstücke</span>
      </div>

      <div className="entry-list">
        {entries.slice(1).map((entry) => (
          <RoadbookCard entry={entry} key={entry.id} />
        ))}
      </div>
    </section>
  );
}

function DiscoverPage({ appState }) {
  return (
    <section className="screen-page">
      <AppHeader compact userProfile={appState.user} />

      <div className="search-book">
        <IconMapPin />
        <span>Touren, Orte oder Erinnerungen suchen</span>
      </div>

      <div className="section-head">
        <h2>Entdecken</h2>
        <span>Orte mit Geschichte</span>
      </div>

      <div className="spot-list">
        {appState.spots.map((spot) => (
          <article className="spot-card" key={spot.id}>
            <img src={spot.image} alt={spot.title} />
            <div>
              <p className="section-label">{spot.category}</p>
              <h3>{spot.title}</h3>
              <p>{spot.meta}</p>
              <strong>★ {spot.score}</strong>
            </div>
          </article>
        ))}
      </div>

      <article className="note-card">
        <p className="section-label">Wochenidee</p>
        <h2>Finde einen Ort, an dem du sonst nur vorbeifährst.</h2>
        <p>
          Nicht jeder Spot muss spektakulär sein. Manchmal reicht ein ruhiger
          Parkplatz, gutes Licht und ein Auto, das dazugehört.
        </p>
      </article>
    </section>
  );
}

function GaragePage({ appState }) {
  return (
    <section className="screen-page">
      <AppHeader compact userProfile={appState.user} />

      <div className="section-head">
        <h2>Garage</h2>
        <span>{appState.vehicles.length} Fahrzeuge</span>
      </div>

      <div className="garage-list">
        {appState.vehicles.map((vehicle) => (
          <article className="garage-card" key={vehicle.id}>
            <img src={vehicle.image} alt={vehicle.name} />
            <div>
              <p className="section-label">{vehicle.status}</p>
              <h2>{vehicle.name}</h2>
              <p>
                {vehicle.year} · {vehicle.type} · {vehicle.engine}
              </p>
              <small>{vehicle.story}</small>
              <span className="visibility-pill">{vehicle.visibility}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilePage({ appState, onEditProfile, onResetDemo }) {
  const stats = useMemo(
    () => [
      { label: "Touren", value: appState.entries.filter((entry) => entry.type === "Tour").length },
      { label: "Spots", value: appState.spots.length },
      { label: "Momente", value: appState.polaroids.length },
      { label: "Kilometer", value: appState.entries.length * 42 },
      { label: "Autos", value: appState.vehicles.length }
    ],
    [appState]
  );

  return (
    <section className="screen-page">
      <AppHeader compact userProfile={appState.user} />

      <article className="profile-card">
        <img src={appState.user.avatar} alt={appState.user.name} />
        <div>
          <p className="section-label">Roadbook Besitzer</p>
          <h2>{appState.user.name}</h2>
          <span>{appState.user.handle}</span>
          <p>{appState.user.bio}</p>
        </div>
      </article>

      <div className="profile-actions">
        <button type="button" onClick={onEditProfile}>
          <IconEdit />
          Profil bearbeiten
        </button>
        <button type="button" onClick={onResetDemo}>
          Demo zurücksetzen
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <article className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>

      <div className="section-head">
        <h2>Kleine Ziele</h2>
        <span>nicht laut, aber schön</span>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.text}</p>
            </div>
            <div className="progress-line">
              <span style={{ width: `${task.progress}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CreateMenu({ onClose, onChoose }) {
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

function SelectField({ label, value, onChange, children }) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function TextField({ label, value, onChange, placeholder = "", type = "text", required = false }) {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder = "", required = false }) {
  return (
    <label>
      {label}
      <textarea
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function EntryForm({ type, vehicles, onCancel, onSave }) {
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
      titlePlaceholder: "Lausitzer Seenland Abendrunde",
      requiredFields: ["title", "region", "description"]
    },
    spot: {
      label: "Neuer Spot",
      titlePlaceholder: "Bärwalder See Parkplatz",
      requiredFields: ["title", "region"]
    },
    moment: {
      label: "Neuer Moment",
      titlePlaceholder: "Sonnenuntergang am See",
      requiredFields: ["title", "description"]
    },
    vehicle: {
      label: "Neues Fahrzeug",
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
          label={type === "vehicle" ? "Fahrzeugname *" : "Titel *"}
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
              label="Region / Ort *"
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

function ProfileEditor({ user, onCancel, onSave }) {
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

function BottomNavigation({ activePage, onChangePage, onOpenCreate }) {
  return (
    <nav className="bottom-nav" aria-label="Hauptnavigation">
      <button
        className={activePage === "feed" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("feed")}
      >
        <IconHome />
        <span>Feed</span>
      </button>

      <button
        className={activePage === "discover" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("discover")}
      >
        <IconCompass />
        <span>Entdecken</span>
      </button>

      <button className="create-button" type="button" onClick={onOpenCreate}>
        <IconPlus />
      </button>

      <button
        className={activePage === "garage" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("garage")}
      >
        <IconGarage />
        <span>Garage</span>
      </button>

      <button
        className={activePage === "profile" ? "nav-item active" : "nav-item"}
        type="button"
        onClick={() => onChangePage("profile")}
      >
        <IconProfile />
        <span>Profil</span>
      </button>
    </nav>
  );
}

function AppShell({ appState, setAppState, onResetDemo }) {
  const [activePage, setActivePage] = useState("feed");
  const [createOpen, setCreateOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function handleChoose(type) {
    setCreateOpen(false);
    setFormType(type);
  }

  function handleSave(type, form) {
    const today = getTodayLabel();

    setAppState((current) => {
      if (type === "vehicle") {
        const newVehicle = {
          id: makeId(),
          name: form.title,
          year: form.year || "unbekannt",
          type: form.bodyType || "Fahrzeug",
          engine: form.engine || "Motor offen",
          status: "Neu in der Garage",
          image: form.image,
          story: form.description || "Noch keine Story hinterlegt.",
          visibility: form.visibility
        };

        return {
          ...current,
          vehicles: [newVehicle, ...current.vehicles]
        };
      }

      if (type === "spot") {
        const newSpot = {
          id: makeId(),
          title: form.title,
          category: form.category,
          meta: `${form.region || "ohne Region"} · ${form.description || "neuer Spot"}`,
          score: "neu",
          image: form.image,
          visibility: form.visibility
        };

        const newEntry = {
          id: makeId(),
          title: form.title,
          subtitle: form.subtitle || form.category,
          type: "Spot",
          vehicle: form.vehicle,
          date: today,
          distance: form.distance || "offen",
          duration: form.duration || "gespeichert",
          location: form.region || current.user.region,
          likes: 0,
          saved: 0,
          image: form.image,
          text: form.description || "Ein neuer Ort im Roadbook.",
          visibility: form.visibility
        };

        return {
          ...current,
          spots: [newSpot, ...current.spots],
          entries: [newEntry, ...current.entries]
        };
      }

      if (type === "moment") {
        const newPolaroid = {
          id: makeId(),
          title: form.title,
          caption: form.description,
          place: form.region || current.user.region,
          image: form.image
        };

        const newEntry = {
          id: makeId(),
          title: form.title,
          subtitle: form.subtitle || "Neuer Moment",
          type: "Moment",
          vehicle: form.vehicle,
          date: today,
          distance: "Moment",
          duration: "festgehalten",
          location: form.region || current.user.region,
          likes: 0,
          saved: 0,
          image: form.image,
          text: form.description,
          visibility: form.visibility
        };

        return {
          ...current,
          polaroids: [newPolaroid, ...current.polaroids],
          entries: [newEntry, ...current.entries]
        };
      }

      const newEntry = {
        id: makeId(),
        title: form.title,
        subtitle: form.subtitle || "Neue Tour",
        type: "Tour",
        vehicle: form.vehicle,
        date: today,
        distance: form.distance || "offen",
        duration: form.duration || "offen",
        location: form.region || current.user.region,
        likes: 0,
        saved: 0,
        image: form.image,
        text: form.description,
        visibility: form.visibility
      };

      return {
        ...current,
        entries: [newEntry, ...current.entries]
      };
    });

    setFormType(null);
    showToast("Gespeichert für die lokale Beta.");
  }

  function handleProfileSave(nextUser) {
    setAppState((current) => ({
      ...current,
      user: nextUser
    }));

    setEditProfile(false);
    showToast("Profil lokal gespeichert.");
  }

  return (
    <div className="phone-shell">
      <div className="phone-notch" />

      <main className="app-screen">
        {activePage === "feed" && <FeedPage appState={appState} />}
        {activePage === "discover" && <DiscoverPage appState={appState} />}
        {activePage === "garage" && <GaragePage appState={appState} />}
        {activePage === "profile" && (
          <ProfilePage
            appState={appState}
            onEditProfile={() => setEditProfile(true)}
            onResetDemo={onResetDemo}
          />
        )}

        <BottomNavigation
          activePage={activePage}
          onChangePage={setActivePage}
          onOpenCreate={() => setCreateOpen(true)}
        />

        {toast && <div className="toast">{toast}</div>}

        {createOpen && (
          <CreateMenu onClose={() => setCreateOpen(false)} onChoose={handleChoose} />
        )}

        {formType && (
          <EntryForm
            type={formType}
            vehicles={appState.vehicles}
            onCancel={() => setFormType(null)}
            onSave={handleSave}
          />
        )}

        {editProfile && (
          <ProfileEditor
            user={appState.user}
            onCancel={() => setEditProfile(false)}
            onSave={handleProfileSave}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  const [appState, setAppState] = useState(() => loadStoredState() || createDefaultState());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  function handleResetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    setAppState(createDefaultState());
  }

  return (
    <div className="site">
      <aside className="desktop-copy">
        <p className="section-label">Blechroute Beta 0.0.9</p>
        <h1>Jetzt fühlt es sich wie eine App an.</h1>
        <p>
          Registrierung, Login-Oberfläche, Profilbearbeitung, neue Touren,
          Spots, Momente, Fahrzeuge und lokale Demo-Speicherung sind drin.
        </p>

        <div className="desktop-tags">
          <span>Login</span>
          <span>Erstellen</span>
          <span>Profil</span>
          <span>lokal gespeichert</span>
        </div>
      </aside>

      <AppShell
        appState={appState}
        setAppState={setAppState}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}