import { useEffect, useState } from "react";

import BottomNavigation from "./components/BottomNavigation";
import CreateMenu from "./components/CreateMenu";
import EntryForm from "./components/EntryForm";
import ProfileEditor from "./components/ProfileEditor";

import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";
import GaragePage from "./pages/GaragePage";
import ProfilePage from "./pages/ProfilePage";

import { createDefaultState } from "./data/demoData";

import {
  clearStoredState,
  getTodayLabel,
  loadStoredState,
  makeId,
  saveStoredState
} from "./utils/storage";

function AppShell({ appState, setAppState, onResetDemo }) {
  const [activePage, setActivePage] = useState("feed");
  const [createOpen, setCreateOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
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
          meta: `${form.region || "ohne Region"} · ${
            form.description || "neuer Spot"
          }`,
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
          <CreateMenu
            onClose={() => setCreateOpen(false)}
            onChoose={handleChoose}
          />
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
  const [appState, setAppState] = useState(() => {
    return loadStoredState() || createDefaultState();
  });

  useEffect(() => {
    saveStoredState(appState);
  }, [appState]);

  function handleResetDemo() {
    clearStoredState();
    setAppState(createDefaultState());
  }

  return (
    <div className="site">
      <div
        style={{
          gridColumn: "1 / -1",
          justifySelf: "center"
        }}
      >
        <AppShell
          appState={appState}
          setAppState={setAppState}
          onResetDemo={handleResetDemo}
        />
      </div>
    </div>
  );
}