import { IconHeart, IconMapPin } from "../icons/Icons";

export default function CommunityProfileSheet({
  user,
  entries,
  followingHandles,
  onToggleFollow,
  onClose
}) {
  const isFollowing = followingHandles.includes(user.handle);

  const totalLikes = entries.reduce((sum, entry) => {
    return sum + Number(entry.likes || 0);
  }, 0);

  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onClose}>
      <div
        className="entry-form"
        onClick={(event) => event.stopPropagation()}
        style={{
          alignSelf: "end"
        }}
      >
        <div className="sheet-handle" />

        <article className="profile-card">
          <img src={user.avatar} alt={user.name} />

          <div>
            <p className="section-label">Community Profil</p>
            <h2>{user.name}</h2>
            <span>{user.handle}</span>
            <p>{user.bio}</p>
          </div>
        </article>

        <div className="roadbook-meta">
          <span>
            <IconMapPin />
            {user.region || "Region offen"}
          </span>
          <span>{entries.length} Beiträge</span>
          <span>{totalLikes} Likes</span>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => onToggleFollow(user.handle)}>
            {isFollowing ? "Nicht mehr folgen" : "Folgen"}
          </button>

          <button className="ghost-button" type="button" onClick={onClose}>
            Schließen
          </button>
        </div>

        <div className="section-head">
          <h2>Beiträge</h2>
          <span>{entries.length} sichtbar</span>
        </div>

        <div className="entry-list">
          {entries.length > 0 ? (
            entries.slice(0, 4).map((entry) => (
              <article className="note-card" key={entry.id}>
                <p className="section-label">{entry.type}</p>
                <h2>{entry.title}</h2>
                <p>{entry.text}</p>

                <div className="roadbook-meta">
                  <span>{entry.vehicle}</span>
                  <span>{entry.location}</span>
                  <span>
                    <IconHeart />
                    {entry.likes}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <article className="note-card">
              <p className="section-label">Noch leer</p>
              <h2>Von diesem Nutzer sind noch keine Beiträge sichtbar.</h2>
              <p>
                Später landen hier echte Roadbook Einträge, Spots und Momente
                aus der Community.
              </p>
            </article>
          )}
        </div>

        <small>
          Dieses Profil ist aktuell Teil der lokalen Beta. Folgen wird im Browser
          gespeichert.
        </small>
      </div>
    </div>
  );
}