import { useEffect, useState } from "react";

import AppMenu from "./components/AppMenu";
import BottomNavigation from "./components/BottomNavigation";
import CommunityPage from "./components/CommunityPage";
import CommunityProfileSheet from "./components/CommunityProfileSheet";
import CreateMenu from "./components/CreateMenu";
import EntryForm from "./components/EntryForm";
import ProfileEditor from "./components/ProfileEditor";

import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";
import GaragePage from "./pages/GaragePage";
import MomentsPage from "./pages/MomentsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import SavedPage from "./pages/SavedPage";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [selectedCommunityUser, setSelectedCommunityUser] = useState(null);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  function goToFeed() {
    setActivePage("feed");
  }

  function goToMap() {
    setActivePage("discover");
  }

  function goToGarage() {
    setActivePage("garage");
  }

  function goToCommunity() {
    setActivePage("community");
  }

  function goToMoments() {
    setActivePage("moments");
  }

  function goToSaved() {
    setActivePage("saved");
  }

  function goToNotifications() {
    setActivePage("notifications");
  }

  function goToProfile() {
    setActivePage("profile");
  }

  function openMenu() {
    setMenuOpen(true);
  }

  function addNotification(notification) {
    setAppState((current) => {
      const currentNotifications = current.notifications || [];

      return {
        ...current,
        notifications: [
          {
            id: makeId(),
            time: "gerade eben",
            read: false,
            ...notification
          },
          ...currentNotifications
        ]
      };
    });
  }

  function markNotificationRead(notificationId) {
    setAppState((current) => ({
      ...current,
      notifications: (current.notifications || []).map((notification) => {
        if (notification.id !== notificationId) {
          return notification;
        }

        return {
          ...notification,
          read: true
        };
      })
    }));
  }

  function markAllNotificationsRead() {
    setAppState((current) => ({
      ...current,
      notifications: (current.notifications || []).map((notification) => ({
        ...notification,
        read: true
      }))
    }));

    showToast("Alle Aktivitäten wurden gelesen.");
  }

  function clearReadNotifications() {
    setAppState((current) => ({
      ...current,
      notifications: (current.notifications || []).filter(
        (notification) => !notification.read
      )
    }));

    showToast("Gelesene Aktivitäten wurden entfernt.");
  }

  function handleOpenCommunityProfile(user) {
    if (!user) {
      return;
    }

    if (user.handle === appState.user.handle) {
      setActivePage("profile");
      return;
    }

    setSelectedCommunityUser(user);
  }

  function toggleFollow(handle) {
    if (!handle) {
      return;
    }

    setAppState((current) => {
      const currentHandles = current.followingHandles || [];
      const isFollowing = currentHandles.includes(handle);

      return {
        ...current,
        followingHandles: isFollowing
          ? currentHandles.filter((item) => item !== handle)
          : [...currentHandles, handle]
      };
    });

    addNotification({
      type: "follow",
      title: "Folgen aktualisiert",
      text: `Du hast den Folgen Status von ${handle} geändert.`
    });
  }

  function toggleSavedEntry(entryId) {
    const entry = appState.entries.find((item) => item.id === entryId);
    const isAlreadySaved = (appState.savedEntryIds || []).includes(entryId);

    setAppState((current) => {
      const currentSaved = current.savedEntryIds || [];
      const isSaved = currentSaved.includes(entryId);

      return {
        ...current,
        savedEntryIds: isSaved
          ? currentSaved.filter((id) => id !== entryId)
          : [...currentSaved, entryId]
      };
    });

    if (entry) {
      addNotification({
        type: "saved",
        title: isAlreadySaved ? "Beitrag entfernt" : "Beitrag gespeichert",
        text: isAlreadySaved
          ? `„${entry.title}“ wurde aus deiner Sammlung entfernt.`
          : `„${entry.title}“ liegt jetzt in deinen gespeicherten Beiträgen.`
      });
    }
  }

  function handleChoose(type) {
    setCreateOpen(false);
    setFormType(type);
  }

  function updateEntry(entryId, updater) {
    setAppState((current) => ({
      ...current,
      entries: current.entries.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }

        return typeof updater === "function" ? updater(entry) : updater;
      })
    }));
  }

  function deleteEntry(entryId) {
    setAppState((current) => {
      const entryToDelete = current.entries.find((entry) => entry.id === entryId);

      const nextEntries = current.entries.filter((entry) => entry.id !== entryId);

      const nextPolaroids =
        entryToDelete?.type === "Moment"
          ? current.polaroids.filter(
              (polaroid) =>
                polaroid.title !== entryToDelete.title ||
                polaroid.image !== entryToDelete.image
            )
          : current.polaroids;

      return {
        ...current,
        entries: nextEntries,
        polaroids: nextPolaroids,
        savedEntryIds: (current.savedEntryIds || []).filter((id) => id !== entryId)
      };
    });

    addNotification({
      type: "system",
      title: "Eintrag gelöscht",
      text: "Der Roadbook Eintrag wurde aus deiner lokalen Beta entfernt."
    });

    showToast("Eintrag wurde gelöscht.");
  }

  function updateVehicle(vehicleId, updater) {
    setAppState((current) => ({
      ...current,
      vehicles: current.vehicles.map((vehicle) => {
        if (vehicle.id !== vehicleId) {
          return vehicle;
        }

        return typeof updater === "function" ? updater(vehicle) : updater;
      })
    }));

    addNotification({
      type: "garage",
      title: "Garage aktualisiert",
      text: "Eine Fahrzeugakte wurde geändert."
    });

    showToast("Garage aktualisiert.");
  }

  function deleteVehicle(vehicleId) {
    setAppState((current) => ({
      ...current,
      vehicles: current.vehicles.filter((vehicle) => vehicle.id !== vehicleId)
    }));

    addNotification({
      type: "garage",
      title: "Fahrzeug entfernt",
      text: "Ein Fahrzeug wurde aus deiner Garage gelöscht."
    });

    showToast("Fahrzeug wurde entfernt.");
  }

  function handleSave(type, form) {
    const today = getTodayLabel();

    setAppState((current) => {
      const author = {
        name: current.user.name,
        handle: current.user.handle,
        region: current.user.region,
        avatar: current.user.avatar,
        bio: current.user.bio
      };

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
          visibility: form.visibility,
          author,
          comments: []
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
          visibility: form.visibility,
          author,
          comments: []
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
        visibility: form.visibility,
        author,
        comments: []
      };

      return {
        ...current,
        entries: [newEntry, ...current.entries]
      };
    });

    const notificationText =
      type === "vehicle"
        ? `„${form.title}“ wurde deiner Garage hinzugefügt.`
        : `„${form.title}“ wurde deinem Roadbook hinzugefügt.`;

    addNotification({
      type: type === "vehicle" ? "garage" : "roadbook",
      title: "Neuer Eintrag gespeichert",
      text: notificationText
    });

    setFormType(null);
    showToast("Gespeichert für die lokale Beta.");
  }

  function handleProfileSave(nextUser) {
    setAppState((current) => ({
      ...current,
      user: nextUser
    }));

    addNotification({
      type: "profile",
      title: "Profil aktualisiert",
      text: "Deine Profilangaben wurden lokal gespeichert."
    });

    setEditProfile(false);
    showToast("Profil lokal gespeichert.");
  }

  function handleResetDemoFromMenu() {
    onResetDemo();
    setSelectedCommunityUser(null);
    showToast("Demo wurde zurückgesetzt.");
  }

  const selectedUserEntries = selectedCommunityUser
    ? appState.entries.filter(
        (entry) => entry.author?.handle === selectedCommunityUser.handle
      )
    : [];

  const notifications = appState.notifications || [];
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const sharedRoadbookProps = {
    currentUser: appState.user,
    savedEntryIds: appState.savedEntryIds || [],
    onToggleSavedEntry: toggleSavedEntry,
    onUpdateEntry: updateEntry,
    onDeleteEntry: deleteEntry,
    onOpenCommunityProfile: handleOpenCommunityProfile
  };

  return (
    <div className="phone-shell">
      <div className="phone-notch" />

      <main className="app-screen">
        {activePage === "feed" && (
          <FeedPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedRoadbookProps}
          />
        )}

        {activePage === "discover" && (
          <DiscoverPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
          />
        )}

        {activePage === "garage" && (
          <GaragePage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            onUpdateVehicle={updateVehicle}
            onDeleteVehicle={deleteVehicle}
          />
        )}

        {activePage === "community" && <CommunityPage onOpenMenu={openMenu} />}

        {activePage === "moments" && (
          <MomentsPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedRoadbookProps}
          />
        )}

        {activePage === "saved" && (
          <SavedPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedRoadbookProps}
          />
        )}

        {activePage === "notifications" && (
          <NotificationsPage
            appState={appState}
            activePage={activePage}
            unreadCount={unreadCount}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            onMarkRead={markNotificationRead}
            onMarkAllRead={markAllNotificationsRead}
            onClearRead={clearReadNotifications}
          />
        )}

        {activePage === "profile" && (
          <ProfilePage
            appState={appState}
            activePage={activePage}
            onEditProfile={() => setEditProfile(true)}
            onResetDemo={onResetDemo}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
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

        {menuOpen && (
          <AppMenu
            user={appState.user}
            savedCount={(appState.savedEntryIds || []).length}
            unreadCount={unreadCount}
            onClose={() => setMenuOpen(false)}
            onGoToFeed={goToFeed}
            onGoToDiscover={goToMap}
            onGoToGarage={goToGarage}
            onGoToCommunity={goToCommunity}
            onGoToMoments={goToMoments}
            onGoToSaved={goToSaved}
            onGoToNotifications={goToNotifications}
            onGoToProfile={goToProfile}
            onResetDemo={handleResetDemoFromMenu}
          />
        )}

        {selectedCommunityUser && (
          <CommunityProfileSheet
            user={selectedCommunityUser}
            entries={selectedUserEntries}
            followingHandles={appState.followingHandles || []}
            onToggleFollow={toggleFollow}
            onClose={() => setSelectedCommunityUser(null)}
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
      <AppShell
        appState={appState}
        setAppState={setAppState}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}
