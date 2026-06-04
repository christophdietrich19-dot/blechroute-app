import { useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import { IconBookmark, IconMapPin } from "../icons/Icons";

export default function DiscoverPage({
  appState,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [savedSpotIds, setSavedSpotIds] = useState([]);

  const categories = useMemo(() => {
    const uniqueCategories = appState.spots
      .map((spot) => spot.category)
      .filter(Boolean);

    return ["Alle", ...new Set(uniqueCategories)];
  }, [appState.spots]);

  const filteredSpots = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return appState.spots.filter((spot) => {
      const matchesCategory =
        activeCategory === "Alle" || spot.category === activeCategory;

      const searchText = [
        spot.title,
        spot.category,
        spot.meta,
        spot.visibility,
        spot.score
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !cleanSearch || searchText.includes(cleanSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, appState.spots, searchTerm]);

  function toggleSavedSpot(spotId) {
    setSavedSpotIds((current) => {
      if (current.includes(spotId)) {
        return current.filter((id) => id !== spotId);
      }

      return [...current, spotId];
    });
  }

  function resetFilters() {
    setSearchTerm("");
    setActiveCategory("Alle");
  }

  return (
    <section className="screen-page">
      <AppHeader
        compact
        userProfile={appState.user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
      />

      <div className="welcome-block">
        <p className="section-label">Map & Orte</p>
        <h2>Finde Spots, die eine Geschichte wert sind.</h2>
        <p>
          Suche nach Orten, Kategorien oder kleinen Hinweisen. Später wird daraus
          die echte Blechroute Karte mit gespeicherten Zielen.
        </p>
      </div>

      <label
        className="search-book"
        style={{
          display: "grid",
          gridTemplateColumns: "22px 1fr",
          cursor: "text"
        }}
      >
        <IconMapPin />
        <input
          value={searchTerm}
          type="search"
          placeholder="Ort, Route oder Erinnerung suchen..."
          onChange={(event) => setSearchTerm(event.target.value)}
          style={{
            width: "100%",
            border: 0,
            color: "var(--paper)",
            background: "transparent",
            outline: "none",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            fontSize: "0.86rem"
          }}
        />
      </label>

      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: "12px 2px 2px",
          scrollbarWidth: "none"
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={
              activeCategory === category ? "soft-action active" : "soft-action"
            }
            onClick={() => setActiveCategory(category)}
            style={{
              flex: "0 0 auto"
            }}
          >
            <span>{category}</span>
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "9px",
          marginTop: "14px"
        }}
      >
        <article className="stat-card">
          <strong>{appState.spots.length}</strong>
          <span>Spots</span>
        </article>

        <article className="stat-card">
          <strong>{savedSpotIds.length}</strong>
          <span>Gemerkte</span>
        </article>

        <article className="stat-card">
          <strong>{filteredSpots.length}</strong>
          <span>Treffer</span>
        </article>
      </div>

      <div className="section-head">
        <h2>Gefundene Orte</h2>
        <span>
          {activeCategory === "Alle" ? "alle Kategorien" : activeCategory}
        </span>
      </div>

      <div className="spot-list">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => {
            const isSaved = savedSpotIds.includes(spot.id);

            return (
              <article className="spot-card" key={spot.id}>
                <img src={spot.image} alt={spot.title} />

                <div>
                  <p className="section-label">{spot.category}</p>
                  <h3>{spot.title}</h3>
                  <p>{spot.meta}</p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      marginTop: "12px"
                    }}
                  >
                    <strong>★ {spot.score}</strong>

                    <button
                      type="button"
                      className={isSaved ? "soft-action active" : "soft-action"}
                      onClick={() => toggleSavedSpot(spot.id)}
                      style={{
                        padding: "7px 9px",
                        fontSize: "0.7rem"
                      }}
                    >
                      <IconBookmark />
                      <span>{isSaved ? "Gemerkt" : "Merken"}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <article className="note-card">
            <p className="section-label">Keine Treffer</p>
            <h2>Zu deiner Suche wurde kein Ort gefunden.</h2>
            <p>
              Versuch es mit einem anderen Begriff oder setze die Filter zurück.
            </p>

            <button
              type="button"
              className="soft-action active"
              onClick={resetFilters}
              style={{
                marginTop: "14px"
              }}
            >
              Filter zurücksetzen
            </button>
          </article>
        )}
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