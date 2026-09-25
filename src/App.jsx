import { useEffect, useRef, useState } from "react";
import { App as CapacitorApp } from "@capacitor/app";

import AppMenu from "./components/AppMenu";
import AuthGate from "./components/AuthGate";
import BottomNavigation from "./components/BottomNavigation";
import CommunityPage from "./components/CommunityPage";
import CommunityProfileSheet from "./components/CommunityProfileSheet";
import CreateMenu from "./components/CreateMenu";
import EntryForm from "./components/EntryForm";
import ModerationSheet from "./components/ModerationSheet";
import LegalSheet from "./components/LegalSheet";
import ProfileEditor from "./components/ProfileEditor";
import PublicSafetySheet from "./components/PublicSafetySheet";
import ShareSheet from "./components/ShareSheet";

import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";
import GaragePage from "./pages/GaragePage";
import MomentsPage from "./pages/MomentsPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import SavedPage from "./pages/SavedPage";
import RoadbookMapPage from "./pages/RoadbookMapPage";

import { createDefaultState } from "./data/demoData";
import { isOwnAuthor } from "./data/appSchema";
import { TESTER_CONFIG } from "./config/testerConfig";
import { createLocalAppDataGateway } from "./services/appDataGateway";

import {
  getTodayLabel,
  makeId,
  requestPersistentStorage
} from "./utils/storage";
import {
  acceptTerms,
  clearAllLocalAccessData,
  clearSession,
  getLocalAccessMetadata,
  loadSession,
  saveSession
} from "./utils/session";

function AppShell({ appState, setAppState, onResetDemo, onLogout, onClearPersonalData, storageWarning }) {
  const [activePage, setActivePage] = useState("feed");
  const [createOpen, setCreateOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [selectedCommunityUser, setSelectedCommunityUser] = useState(null);
  const [publicSafetyOpen, setPublicSafetyOpen] = useState(false);
  const [moderationTarget, setModerationTarget] = useState(null);
  const [legalTab, setLegalTab] = useState(null);
  const [shareEntry, setShareEntry] = useState(null);
  const [toast, setToast] = useState("");
  const lastBackPress = useRef(0);
  const pageHistory = useRef(["feed"]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const activeScreen = document.querySelector(".screen-page");

      if (activeScreen) {
        activeScreen.scrollTop = 0;
        activeScreen.scrollLeft = 0;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activePage]);

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  useEffect(() => {
    if (import.meta.env.VITE_PLATFORM !== "android") return undefined;

    let disposed = false;
    let listenerHandle;

    CapacitorApp.addListener("backButton", () => {
      if (editProfile) return setEditProfile(false);
      if (formType) return setFormType(null);
      if (shareEntry) return setShareEntry(null);
      if (legalTab) return setLegalTab(null);
      if (moderationTarget) return setModerationTarget(null);
      if (publicSafetyOpen) return setPublicSafetyOpen(false);
      if (selectedCommunityUser) return setSelectedCommunityUser(null);
      if (menuOpen) return setMenuOpen(false);
      if (createOpen) return setCreateOpen(false);

      if (pageHistory.current.length > 1) {
        pageHistory.current.pop();
        setActivePage(pageHistory.current[pageHistory.current.length - 1] || "feed");
        return;
      }

      const now = Date.now();
      if (now - lastBackPress.current < 2000) {
        CapacitorApp.exitApp();
        return;
      }

      lastBackPress.current = now;
      showToast("Noch einmal zurück, um Blechroute zu schließen.");
    }).then((handle) => {
      if (disposed) handle.remove();
      else listenerHandle = handle;
    });

    return () => {
      disposed = true;
      listenerHandle?.remove();
    };
  }, [
    activePage,
    createOpen,
    editProfile,
    formType,
    legalTab,
    menuOpen,
    moderationTarget,
    publicSafetyOpen,
    selectedCommunityUser,
    shareEntry
  ]);

  function navigateToPage(page) {
    if (!page || page === activePage) return;
    pageHistory.current.push(page);
    setActivePage(page);
  }

  function goToFeed() {
    navigateToPage("feed");
  }

  function goToMap() {
    navigateToPage("discover");
  }

  function goToRoadbookMap() {
    navigateToPage("roadbook-map");
  }

  function goToGarage() {
    navigateToPage("garage");
  }

  function goToCommunity() {
    navigateToPage("community");
  }

  function goToMoments() {
    navigateToPage("moments");
  }

  function goToSaved() {
    navigateToPage("saved");
  }

  function goToNotifications() {
    navigateToPage("notifications");
  }

  function goToMessages() {
    navigateToPage("messages");
  }

  function goToProfile() {
    navigateToPage("profile");
  }

  function markConversationRead(conversationId) {
    setAppState((current) => ({
      ...current,
      conversations: (current.conversations || []).map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation
      )
    }));
  }

  function sendMessage(conversationId, text) {
    const recipient = (appState.conversations || []).find((conversation) => conversation.id === conversationId);
    if (!recipient || (appState.blockedProfiles || []).some(
      (profile) => profile.key === `handle:${recipient.participant?.handle}`
    )) {
      showToast("Dieser Kontakt ist blockiert oder nicht verfügbar.");
      return false;
    }
    setAppState((current) => ({
      ...current,
      conversations: (current.conversations || []).map((conversation) => {
        if (conversation.id !== conversationId) return conversation;
        return {
          ...conversation,
          messages: [
            ...conversation.messages,
            {
              id: makeId(),
              senderId: "self",
              from: current.user.name,
              text,
              time: new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(new Date())
            }
          ]
        };
      })
    }));
    return true;
  }

  function forwardEntry(conversationId) {
    if (!shareEntry) return;
    if (!sendMessage(conversationId, `Geteilter Beitrag: „${shareEntry.title}“ · ${shareEntry.vehicle}`)) return;
    setShareEntry(null);
    showToast("Beitrag wurde im Demo-Chat geteilt.");
  }

  async function systemShareEntry() {
    if (!shareEntry) return;
    const shareData = {
      title: `Blechroute · ${shareEntry.title}`,
      text: `${shareEntry.title}\n${shareEntry.text}\n${shareEntry.vehicle}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        showToast("Beitragstext wurde kopiert.");
      }
      setShareEntry(null);
    } catch {
      // Abbruch der Systemfreigabe ist kein Fehler.
    }
  }

  function repostEntry(entry = shareEntry) {
    if (!entry) return;
    const repost = {
      ...entry,
      id: makeId(),
      type: "Repost",
      date: getTodayLabel(),
      likes: 0,
      saved: 0,
      comments: [],
      repostSource: entry.author?.name || "Community",
      author: {
        id: appState.user.id,
        name: appState.user.name,
        handle: appState.user.handle,
        region: appState.user.region,
        avatar: appState.user.avatar,
        bio: appState.user.bio
      }
    };

    setAppState((current) => ({ ...current, entries: [repost, ...current.entries] }));
    setShareEntry(null);
    addNotification({ type: "repost", title: "Beitrag repostet", text: `„${entry.title}“ steht jetzt in deinem Roadbook.` });
    showToast("Repost wurde lokal erstellt.");
  }

  function reportError() {
    const subject = encodeURIComponent("Blechroute Fehlerbericht");
    const body = encodeURIComponent(
      `App-Version: ${TESTER_CONFIG.version}\nGerät/Browser: ${navigator.userAgent}\n\nFehlerbeschreibung:\n\nSchritte zum Nachstellen:\n\nScreenshot bitte bei Bedarf manuell anhängen.`
    );
    window.location.href = `mailto:${TESTER_CONFIG.supportEmail}?subject=${subject}&body=${body}`;
  }

  function openMenu() {
    setMenuOpen(true);
  }

  function openPublicSafety() {
    setMenuOpen(false);
    setPublicSafetyOpen(true);
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

    if (user.id === appState.user.id || user.handle === appState.user.handle) {
      navigateToPage("profile");
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

  function toggleVehicleFollow(vehicleId, vehicleName) {
    setAppState((current) => {
      const currentIds = current.followingVehicleIds || [];
      const isFollowing = currentIds.includes(vehicleId);
      return {
        ...current,
        followingVehicleIds: isFollowing
          ? currentIds.filter((id) => id !== vehicleId)
          : [...currentIds, vehicleId]
      };
    });
    showToast(`Fahrzeug-Abo für ${vehicleName} aktualisiert.`);
  }

  function toggleBlockedProfile(key, label) {
    if (!key) {
      return;
    }

    setAppState((current) => {
      const blockedProfiles = current.blockedProfiles || [];
      const isBlocked = blockedProfiles.some((item) => item.key === key);

      return {
        ...current,
        blockedProfiles: isBlocked
          ? blockedProfiles.filter((item) => item.key !== key)
          : [...blockedProfiles, { key, label }],
        followingHandles: key.startsWith("handle:") && !isBlocked
          ? (current.followingHandles || []).filter(
              (handle) => `handle:${handle}` !== key
            )
          : current.followingHandles || []
      };
    });

    if (selectedCommunityUser && key === `handle:${selectedCommunityUser.handle}`) {
      setSelectedCommunityUser(null);
    }

    showToast("Blockierliste aktualisiert.");
  }

  function unblockProfile(key) {
    setAppState((current) => ({
      ...current,
      blockedProfiles: (current.blockedProfiles || []).filter(
        (item) => item.key !== key
      )
    }));
    showToast("Profil wird wieder angezeigt.");
  }

  function submitReport({ target, reason, details }) {
    setAppState((current) => ({
      ...current,
      reports: [
        {
          id: makeId(),
          target,
          reason,
          details,
          createdAt: new Date().toISOString(),
          status: "local-only"
        },
        ...(current.reports || [])
      ]
    }));

    setModerationTarget(null);
    showToast("Meldung wurde lokal vorgemerkt.");
  }

  function clearReports() {
    setAppState((current) => ({ ...current, reports: [] }));
    showToast("Lokale Meldeliste wurde geleert.");
  }

  function exportLocalData() {
    const exportPayload = {
      app: "Blechroute",
      formatVersion: 2,
      exportedAt: new Date().toISOString(),
      storage: "local-browser-only",
      access: getLocalAccessMetadata(),
      data: appState
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `blechroute-daten-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    showToast("Lokale Datenkopie wurde erstellt.");
  }

  async function clearPersonalData() {
    const cleared = await onClearPersonalData();
    if (!cleared) {
      showToast("Lokale Daten konnten nicht vollständig gelöscht werden.");
      return;
    }
    setSelectedCommunityUser(null);
    setModerationTarget(null);
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

  function toggleLikedEntry(entryId) {
    setAppState((current) => {
      if (!current.entries.some((entry) => entry.id === entryId)) return current;
      const likedEntryIds = current.likedEntryIds || [];
      const wasLiked = likedEntryIds.includes(entryId);
      return {
        ...current,
        likedEntryIds: wasLiked
          ? likedEntryIds.filter((id) => id !== entryId)
          : [...likedEntryIds, entryId],
        entries: current.entries.map((entry) => entry.id === entryId
          ? { ...entry, likes: Math.max(0, Number(entry.likes || 0) + (wasLiked ? -1 : 1)) }
          : entry)
      };
    });
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
        savedEntryIds: (current.savedEntryIds || []).filter((id) => id !== entryId),
        likedEntryIds: (current.likedEntryIds || []).filter((id) => id !== entryId)
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
        id: current.user.id,
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
      user: { ...nextUser, id: current.user.id },
      entries: current.entries.map((entry) => isOwnAuthor(entry.author, current.user)
        ? {
            ...entry,
            author: {
              ...entry.author,
              id: current.user.id,
              name: nextUser.name,
              handle: nextUser.handle,
              avatar: nextUser.avatar,
              region: nextUser.region,
              bio: nextUser.bio
            }
          }
        : entry)
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
  const unreadMessages = (appState.conversations || []).reduce(
    (sum, conversation) => sum + (
      (appState.blockedProfiles || []).some((profile) =>
        profile.key === `handle:${conversation.participant?.handle}`
      ) ? 0 : Number(conversation.unread || 0)
    ),
    0
  );

  const sharedRoadbookProps = {
    currentUser: appState.user,
    savedEntryIds: appState.savedEntryIds || [],
    likedEntryIds: appState.likedEntryIds || [],
    followingHandles: appState.followingHandles || [],
    onToggleSavedEntry: toggleSavedEntry,
    onToggleLikedEntry: toggleLikedEntry,
    onToggleFollow: toggleFollow,
    onUpdateEntry: updateEntry,
    onDeleteEntry: deleteEntry,
    onOpenCommunityProfile: handleOpenCommunityProfile,
    blockedProfiles: appState.blockedProfiles || [],
    onReportEntry: setModerationTarget,
    onShareEntry: setShareEntry,
    onRepostEntry: repostEntry
  };

  const sharedHeaderProps = {
    onOpenMessages: goToMessages,
    onOpenNotifications: goToNotifications,
    unreadMessages,
    unreadNotifications: unreadCount
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
            onOpenCommunity={goToCommunity}
            onOpenRoadbookMap={goToRoadbookMap}
            {...sharedHeaderProps}
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
            {...sharedHeaderProps}
          />
        )}

        {activePage === "roadbook-map" && (
          <RoadbookMapPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedHeaderProps}
            {...sharedRoadbookProps}
          />
        )}

        {activePage === "garage" && (
          <GaragePage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedHeaderProps}
            onUpdateVehicle={updateVehicle}
            onDeleteVehicle={deleteVehicle}
          />
        )}

        {activePage === "community" && (
          <CommunityPage
            user={appState.user}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            {...sharedHeaderProps}
            onOpenMenu={openMenu}
            {...sharedHeaderProps}
            blockedProfiles={appState.blockedProfiles || []}
            followingHandles={appState.followingHandles || []}
            followingVehicleIds={appState.followingVehicleIds || []}
            onToggleProfileFollow={toggleFollow}
            onToggleVehicleFollow={toggleVehicleFollow}
            onToggleBlock={toggleBlockedProfile}
            onReport={setModerationTarget}
          />
        )}

        {activePage === "moments" && (
          <MomentsPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            onCreateMoment={() => handleChoose("moment")}
            {...sharedHeaderProps}
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
            {...sharedHeaderProps}
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
            {...sharedHeaderProps}
            onMarkRead={markNotificationRead}
            onMarkAllRead={markAllNotificationsRead}
            onClearRead={clearReadNotifications}
          />
        )}

        {activePage === "profile" && (
          <ProfilePage
            appState={appState}
            activePage={activePage}
            onOpenGarage={goToGarage}
            onOpenRoadbookMap={goToRoadbookMap}
            onEditProfile={() => setEditProfile(true)}
            onResetDemo={onResetDemo}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            {...sharedHeaderProps}
          />
        )}

        {activePage === "messages" && (
          <MessagesPage
            appState={appState}
            activePage={activePage}
            onOpenFeed={goToFeed}
            onOpenMap={goToMap}
            onOpenMenu={openMenu}
            onOpenMessages={goToMessages}
            onOpenNotifications={goToNotifications}
            unreadMessages={unreadMessages}
            unreadNotifications={unreadCount}
            onSendMessage={sendMessage}
            onReadConversation={markConversationRead}
          />
        )}

        <BottomNavigation
          activePage={activePage}
          menuOpen={menuOpen}
          onChangePage={navigateToPage}
          onOpenCreate={() => setCreateOpen(true)}
          onOpenMenu={openMenu}
        />

        {toast && <div className="toast">{toast}</div>}
        {storageWarning && (
          <div className="storage-warning" role="alert">
            Änderungen konnten nicht gespeichert werden. Bitte sichere deine Daten über Menü → Datenschutz.
          </div>
        )}

        {createOpen && (
          <CreateMenu
            onClose={() => setCreateOpen(false)}
            onChoose={handleChoose}
          />
        )}

        {menuOpen && (
          <AppMenu
            user={appState.user}
            unreadMessages={unreadMessages}
            onCreate={() => setCreateOpen(true)}
            savedCount={(appState.savedEntryIds || []).length}
            unreadCount={unreadCount}
            onClose={() => setMenuOpen(false)}
            onGoToFeed={goToFeed}
            onGoToDiscover={goToMap}
            onGoToRoadbookMap={goToRoadbookMap}
            onGoToGarage={goToGarage}
            onGoToCommunity={goToCommunity}
            onGoToMoments={goToMoments}
            onGoToSaved={goToSaved}
            onGoToNotifications={goToNotifications}
            onGoToMessages={goToMessages}
            onGoToProfile={goToProfile}
            onOpenPublicSafety={openPublicSafety}
            onOpenLegal={setLegalTab}
            onReportError={reportError}
            onLogout={onLogout}
            onResetDemo={handleResetDemoFromMenu}
          />
        )}

        {selectedCommunityUser && (
          <CommunityProfileSheet
            user={selectedCommunityUser}
            entries={selectedUserEntries}
            followingHandles={appState.followingHandles || []}
            onToggleFollow={toggleFollow}
            isBlocked={(appState.blockedProfiles || []).some(
              (item) => item.key === `handle:${selectedCommunityUser.handle}`
            )}
            onToggleBlock={toggleBlockedProfile}
            onReport={setModerationTarget}
            onClose={() => setSelectedCommunityUser(null)}
          />
        )}

        {publicSafetyOpen && (
          <PublicSafetySheet
            appState={appState}
            onClose={() => setPublicSafetyOpen(false)}
            onExportData={exportLocalData}
            onClearPersonalData={clearPersonalData}
            onUnblockProfile={unblockProfile}
            onClearReports={clearReports}
          />
        )}

        {moderationTarget && (
          <ModerationSheet
            target={moderationTarget}
            onClose={() => setModerationTarget(null)}
            onSubmit={submitReport}
          />
        )}

        {legalTab && (
          <LegalSheet initialTab={legalTab} onClose={() => setLegalTab(null)} />
        )}

        {shareEntry && (
          <ShareSheet
            entry={shareEntry}
            conversations={(appState.conversations || []).filter((conversation) =>
              !(appState.blockedProfiles || []).some((profile) =>
                profile.key === `handle:${conversation.participant?.handle}`
              )
            )}
            onClose={() => setShareEntry(null)}
            onForward={forwardEntry}
            onSystemShare={systemShareEntry}
            onRepost={() => repostEntry(shareEntry)}
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
      <div className="beta-watermark" aria-hidden="true">
        Blechroute Beta · vertraulich
      </div>
    </div>
  );
}

export default function App() {
  const [appState, setAppState] = useState(() => createDefaultState());
  const [storageReady, setStorageReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [session, setSession] = useState(() => loadSession());
  const gateway = useRef(null);
  if (!gateway.current) gateway.current = createLocalAppDataGateway();
  const skipNextSave = useRef(false);

  useEffect(() => {
    let active = true;
    gateway.current.load().then((stored) => {
      if (!active) return;
      if (stored) setAppState(stored);
      setStorageReady(true);
      requestPersistentStorage();
    }).catch(() => {
      if (!active) return;
      setStorageWarning(true);
      setStorageReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    let active = true;
    gateway.current.save(appState).then((saved) => {
      if (active) setStorageWarning(!saved);
    }).catch(() => {
      if (active) setStorageWarning(true);
    });
    return () => { active = false; };
  }, [appState, storageReady]);

  async function handleResetDemo() {
    await gateway.current.clear();
    setAppState(createDefaultState());
  }

  async function handleClearPersonalData() {
    const cleared = await gateway.current.clear();
    if (!cleared) return false;
    skipNextSave.current = true;
    clearAllLocalAccessData();
    setAppState(createDefaultState());
    setSession(null);
    return true;
  }

  function handleAuthenticated() {
    acceptTerms();
    setSession(saveSession());
  }

  function handleLogout() {
    clearSession();
    setSession(null);
  }

  if (!session) {
    return <AuthGate onAuthenticated={handleAuthenticated} />;
  }

  if (!storageReady) {
    return <div className="app-loading"><strong>Blechroute</strong><span>Lokales Roadbook wird geladen…</span></div>;
  }

  return (
    <div className="site">
      <AppShell
        appState={appState}
        setAppState={setAppState}
        onResetDemo={handleResetDemo}
        onLogout={handleLogout}
        onClearPersonalData={handleClearPersonalData}
        storageWarning={storageWarning}
      />
    </div>
  );
}
