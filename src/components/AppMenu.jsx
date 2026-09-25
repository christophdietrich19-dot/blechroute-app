import "../styles/community.css";
import AppHeader from "./AppHeader";
import BottomNavigation from "./BottomNavigation";
import StitchedBorder from "./StitchedBorder";
import { IconBookmark, IconCamera, IconGarage, IconHeart, IconHome, IconLogout, IconMail, IconMapPin, IconProfile, IconUsers, IconShield } from "../icons/Icons";

export default function AppMenu({
  user, savedCount = 0, unreadCount = 0, unreadMessages = 0,
  onClose, onGoToFeed, onGoToDiscover, onGoToRoadbookMap, onGoToGarage,
  onGoToCommunity, onGoToMoments, onGoToSaved, onGoToNotifications,
  onGoToMessages, onGoToProfile, onOpenPublicSafety, onOpenLegal,
  onReportError, onLogout, onResetDemo, onCreate
}) {
  function go(callback) { callback?.(); onClose(); }
  const mainItems = [
    [IconProfile, "Profil", onGoToProfile],
    [IconGarage, "Fahrzeuge", onGoToGarage],
    [IconMapPin, "Meine Wege & Touren", onGoToRoadbookMap],
    [IconCamera, "Momente", onGoToMoments],
    [IconUsers, "Community", onGoToCommunity],
    [IconHeart, "Benachrichtigungen", onGoToNotifications, unreadCount],
    [IconShield, "Sicherheit & Datenschutz", onOpenPublicSafety]
  ];
  const moreItems = [
    [IconHome, "Feed", onGoToFeed],
    [IconMapPin, "Map & Orte", onGoToDiscover],
    [IconMail, "Nachrichten", onGoToMessages, unreadMessages],
    [IconBookmark, "Gespeichert", onGoToSaved, savedCount],
    [IconShield, "Fehler melden", onReportError]
  ];
  function renderItems(items) {
    return items.map(([Icon, label, callback, count]) => <button type="button" key={label} onClick={() => go(callback)}>
      <StitchedBorder />
      <Icon /><span>{label}</span>{count > 0 && <small>{count}</small>}<span className="menu-chevron" aria-hidden="true">›</span>
    </button>);
  }
  return <div className="create-overlay app-menu-overlay" role="presentation" onClick={onClose}>
    <div className="create-sheet app-menu-sheet" role="dialog" aria-modal="true" aria-label="Blechroute Menü" onClick={event => event.stopPropagation()}>
      <section className="screen-page app-menu-scroll">
        <AppHeader userProfile={user} activePage="menu" menuOpen onOpenFeed={() => go(onGoToFeed)} onOpenMap={() => go(onGoToDiscover)} onOpenMenu={onClose} onOpenMessages={() => go(onGoToMessages)} onOpenNotifications={() => go(onGoToNotifications)} messageCount={unreadMessages} notificationCount={unreadCount} />
        <div className="menu-roadbook-intro">
          <div><p className="section-label">Mein Bereich</p><h2>Immer<br />weiter.</h2><p>Autos verbinden Orte.<br />Und besondere Menschen.</p></div>
          <figure className="menu-polaroid"><img src={user?.avatar} alt="Dein Roadbook" /><figcaption>Gute Straßen.<br />Gute Geschichten.</figcaption></figure>
        </div>
        <nav className="menu-leather-list" aria-label="Deine Bereiche">{renderItems(mainItems)}</nav>
        <p className="app-menu-group-label">Weitere Funktionen</p>
        <nav className="menu-leather-list" aria-label="Weitere Funktionen">{renderItems(moreItems)}</nav>
        <p className="app-menu-group-label">Rechtliches</p>
        <div className="legal-menu-links">
          <button type="button" onClick={() => go(() => onOpenLegal("imprint"))}>Impressum</button>
          <button type="button" onClick={() => go(() => onOpenLegal("privacy"))}>Datenschutz</button>
          <button type="button" onClick={() => go(() => onOpenLegal("rules"))}>Community-Regeln</button>
          <button type="button" onClick={() => go(() => onOpenLegal("test"))}>Testbedingungen</button>
        </div>
        <article className="app-menu-beta-card"><p className="section-label">Vertrauliche Beta</p><p>Diese Version speichert lokal auf deinem Gerät. Echte Konten, gemeinsame Beiträge und geräteübergreifende Daten kommen später mit dem Backend.</p></article>
        <button className="close-sheet" type="button" onClick={() => go(onResetDemo)}>Demo zurücksetzen</button>
        <button className="close-sheet logout-button" type="button" onClick={onLogout}><IconLogout /> Abmelden</button>
      </section>
      <BottomNavigation activePage="menu" onOpenMenu={onClose} onChangePage={page => go(page === "garage" ? onGoToGarage : page === "moments" ? onGoToMoments : onGoToProfile)} onOpenCreate={() => go(onCreate)} />
    </div>
  </div>;
}
