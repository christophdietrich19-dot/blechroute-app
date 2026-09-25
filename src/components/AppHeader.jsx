import { useEffect, useRef, useState } from "react";
import { IconBell, IconBook, IconMail, IconMapPin } from "../icons/Icons";
import StitchedBorder from "./StitchedBorder";

export default function AppHeader({
  compact = false,
  menuOpen = false,
  userProfile,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenMessages,
  onOpenNotifications,
  messageCount = 0,
  notificationCount = 0
}) {
  const stickyRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollArea = stickyRef.current?.closest(".screen-page");
    if (!scrollArea) return undefined;

    const updateScrolled = () => setIsScrolled(scrollArea.scrollTop > 6);
    updateScrolled();
    scrollArea.addEventListener("scroll", updateScrolled, { passive: true });
    return () => scrollArea.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <>
      <header className={compact ? "app-header compact" : "app-header"}>
        <StitchedBorder />
        <div className="brand-line">
          <div className="brand-center">
            <img className="brand-mark" src={`${import.meta.env.BASE_URL}design-v35/br-hauptlogo.svg`} alt="" />
            <div className="brand-copy">
              <h1>Blechroute</h1>
              <p>{userProfile?.name || "Mehr als nur Ziele."}</p>
            </div>
          </div>

          <div className="header-utilities">
            <button
              className={activePage === "notifications" ? "active" : undefined}
              type="button"
              onClick={onOpenNotifications}
              aria-label="Benachrichtigungen öffnen"
              aria-current={activePage === "notifications" ? "page" : undefined}
            >
              <IconBell />
              {notificationCount > 0 && <span>{Math.min(notificationCount, 9)}</span>}
            </button>
            <button
              className={activePage === "messages" ? "active" : undefined}
              type="button"
              onClick={onOpenMessages}
              aria-label="Nachrichten öffnen"
              aria-current={activePage === "messages" ? "page" : undefined}
            >
              <IconMail />
              {messageCount > 0 && <span>{Math.min(messageCount, 9)}</span>}
            </button>
          </div>
        </div>
      </header>

      <div ref={stickyRef} className={isScrolled ? "road-control-sticky is-scrolled" : "road-control-sticky"}>
        <div className="road-control-row" aria-label="Schnellnavigation">
          <StitchedBorder />
          <button
            className={
              activePage === "discover"
                ? "road-control-button active"
                : "road-control-button"
            }
            type="button"
            onClick={onOpenMap}
            aria-current={activePage === "discover" ? "page" : undefined}
          >
            <StitchedBorder />
            <span className="control-content">
              <IconMapPin />
              MAP
            </span>
          </button>

          <button
            className={
              activePage === "feed"
                ? "road-control-button main-control active"
                : "road-control-button main-control"
            }
            type="button"
            onClick={onOpenFeed}
            aria-current={activePage === "feed" ? "page" : undefined}
          >
            <StitchedBorder />
            <span className="control-content">
              <IconBook />
              FEED
            </span>
          </button>

          <button
            className={menuOpen ? "road-control-button active" : "road-control-button"}
            type="button"
            onClick={onOpenMenu}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-haspopup="dialog"
          >
            <StitchedBorder />
            <span className="control-content">
              <span className="menu-lines" aria-hidden="true">☰</span>
              MENÜ
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
