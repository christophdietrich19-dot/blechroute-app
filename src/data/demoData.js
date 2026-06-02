const basePath = import.meta.env.BASE_URL;

export const STORAGE_KEY = "blechroute-beta-010";

export const carImages = {
  bmwE39: `${basePath}bmw_sedan_bei_sonnenuntergang.png`,
  golf2: `${basePath}volkswagen_golf_bei_sonnenuntergang.png`,
  audi80: `${basePath}audi_bei_sonnenuntergang_auf_landstrasse.png`,
  bmwLake: `${basePath}bmw_am_see_im_goldenen_licht.png`
};

export const defaultUser = {
  name: "Christoph",
  handle: "@christophdietrich19",
  email: "demo@blechroute.de",
  region: "Lausitz",
  bio: "Alte Autos, ruhige Straßen und Erinnerungen, die bleiben.",
  avatar: carImages.bmwLake
};

export const defaultVehicles = [
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

export const defaultRoadbookEntries = [
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

export const defaultSpots = [
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

export const defaultPolaroids = [
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

export const tasks = [
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

export const imageOptions = [
  { label: "BMW E39 Abend", value: carImages.bmwE39 },
  { label: "Golf 2", value: carImages.golf2 },
  { label: "Audi 80 B4", value: carImages.audi80 },
  { label: "BMW am See", value: carImages.bmwLake }
];

export function createDefaultState() {
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