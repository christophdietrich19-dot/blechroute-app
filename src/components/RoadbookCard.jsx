import { useState } from "react";
import EntryEditor from "./EntryEditor";
import { IconBookmark, IconEdit, IconHeart, IconMapPin } from "../icons/Icons";

export default function RoadbookCard({
  entry,
  featured = false,
  currentUser,
  savedEntryIds = [],
  onToggleSavedEntry,
  onUpdateEntry,
  onDeleteEntry,
  onOpenCommunityProfile
}) {
  const [likedByMe, setLikedByMe] = useState(false);
  const [following, setFollowing] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);

  const likes = Number(entry.likes || 0);
  const isSavedByMe = savedEntryIds.includes(entry.id);
  const saved = Number(entry.saved || 0) + (isSavedByMe ? 1 : 0);
  const comments = entry.comments || [];

  const author = entry.author || {
    name: currentUser?.name || "Christoph",
    handle: currentUser?.handle || "@christophdietrich19",
    avatar: currentUser?.avatar || entry.image,
    region: currentUser?.region || "Lausitz",
    bio: currentUser?.bio || "Roadbook Profil"
  };

  const isOwnEntry = !entry.author || entry.author.handle === currentUser?.handle;

  function safeUpdate(updater) {
    if (onUpdateEntry) {
      onUpdateEntry(entry.id, updater);
    }
  }

  function handleLike() {
    const nextLiked = !likedByMe;

    setLikedByMe(nextLiked);

    safeUpdate((currentEntry) => ({
      ...currentEntry,
      likes: Math.max(0, Number(currentEntry.likes || 0) + (nextLiked ? 1 : -1))
    }));
  }

  function handleSave() {
    if (onToggleSavedEntry) {
      onToggleSavedEntry(entry.id);
    }
  }

  function handleAddComment(event) {
    event.preventDefault();

    const cleanText = commentText.trim();

    if (!cleanText) {
      return;
    }

    const newComment = {
      id: Date.now(),
      author: currentUser?.name || "Christoph",
      text: cleanText
    };

    safeUpdate((currentEntry) => ({
      ...currentEntry,
      comments: [...(currentEntry.comments || []), newComment]
    }));

    setCommentText("");
    setCommentsOpen(true);
  }

  function handleSaveEdit(nextEntry) {
    safeUpdate((currentEntry) => ({
      ...currentEntry,
      ...nextEntry,
      comments: currentEntry.comments || [],
      likes: currentEntry.likes || 0,
      saved: currentEntry.saved || 0
    }));

    setEditorOpen(false);
  }

  function handleDelete() {
    const confirmed = window.confirm(
      `Soll "${entry.title}" wirklich gelöscht werden?`
    );

    if (!confirmed) {
      return;
    }

    if (onDeleteEntry) {
      onDeleteEntry(entry.id);
    }

    setEditorOpen(false);
  }

  function handleOpenAuthor() {
    if (onOpenCommunityProfile) {
      onOpenCommunityProfile(author);
    }
  }

  return (
    <>
      <article className={featured ? "roadbook-card featured" : "roadbook-card"}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            padding: "14px 16px 0"
          }}
        >
          <button
            type="button"
            onClick={handleOpenAuthor}
            style={{
              display: "grid",
              gridTemplateColumns: "42px 1fr",
              alignItems: "center",
              gap: "11px",
              minWidth: 0,
              flex: 1,
              border: 0,
              padding: 0,
              color: "inherit",
              background: "transparent",
              textAlign: "left"
            }}
          >
            <img
              src={author.avatar}
              alt={author.name}
              style={{
                width: "42px",
                height: "42px",
                objectFit: "cover",
                borderRadius: "14px",
                border: "1px solid rgba(216, 174, 103, 0.32)"
              }}
            />

            <div style={{ minWidth: 0 }}>
              <strong
                style={{
                  display: "block",
                  color: "var(--paper)",
                  fontSize: "0.95rem",
                  lineHeight: 1.1
                }}
              >
                {author.name}
              </strong>

              <span
                style={{
                  display: "block",
                  marginTop: "3px",
                  color: "var(--paper-muted)",
                  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                  fontSize: "0.72rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {author.handle} · {entry.date}
              </span>
            </div>
          </button>

          {isOwnEntry ? (
            <button
              type="button"
              onClick={() => setEditorOpen(true)}
              style={{
                border: "1px solid rgba(216, 174, 103, 0.24)",
                borderRadius: "999px",
                color: "var(--gold-light)",
                background: "rgba(54, 22, 8, 0.72)",
                padding: "8px 10px",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <IconEdit />
              <span>Ändern</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setFollowing((current) => !current)}
              style={{
                border: "1px solid rgba(216, 174, 103, 0.24)",
                borderRadius: "999px",
                color: following ? "var(--paper-ink)" : "var(--gold-light)",
                background: following
                  ? "linear-gradient(145deg, var(--gold-light), var(--gold))"
                  : "rgba(54, 22, 8, 0.72)",
                padding: "8px 10px",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontSize: "0.68rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase"
              }}
            >
              {following ? "Folgt" : "Folgen"}
            </button>
          )}
        </div>

        <div className="roadbook-image" style={{ marginTop: "14px" }}>
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

          <div className="roadbook-meta">
            <span>
              <IconMapPin />
              {entry.location}
            </span>
          </div>

          <div className="roadbook-actions">
            <button
              className={likedByMe ? "soft-action active" : "soft-action"}
              type="button"
              onClick={handleLike}
            >
              <IconHeart />
              <span>{likes}</span>
            </button>

            <button
              className={isSavedByMe ? "soft-action active" : "soft-action"}
              type="button"
              onClick={handleSave}
            >
              <IconBookmark />
              <span>{saved}</span>
            </button>

            <button
              className={commentsOpen ? "soft-action active" : "soft-action"}
              type="button"
              onClick={() => setCommentsOpen((current) => !current)}
            >
              <span>{comments.length} Kommentare</span>
            </button>
          </div>

          {commentsOpen && (
            <div
              style={{
                marginTop: "14px",
                padding: "12px",
                border: "1px solid rgba(216, 174, 103, 0.16)",
                borderRadius: "18px",
                background: "rgba(24, 9, 4, 0.42)"
              }}
            >
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <p
                    key={comment.id}
                    style={{
                      margin: "0 0 8px",
                      color: "var(--paper-soft)",
                      fontSize: "0.86rem",
                      lineHeight: 1.45
                    }}
                  >
                    <strong style={{ color: "var(--gold-light)" }}>
                      {comment.author}
                    </strong>{" "}
                    {comment.text}
                  </p>
                ))
              ) : (
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "var(--paper-muted)",
                    fontSize: "0.86rem",
                    lineHeight: 1.45
                  }}
                >
                  Noch keine Kommentare. Sag etwas zu diesem Moment.
                </p>
              )}

              <form
                onSubmit={handleAddComment}
                style={{
                  display: "grid",
                  gap: "9px",
                  marginTop: "12px"
                }}
              >
                <textarea
                  value={commentText}
                  placeholder="Kommentar schreiben..."
                  onChange={(event) => setCommentText(event.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "74px",
                    resize: "vertical",
                    border: "1px solid rgba(216, 174, 103, 0.2)",
                    borderRadius: "14px",
                    padding: "10px",
                    color: "var(--paper)",
                    background: "rgba(255, 255, 255, 0.055)",
                    outline: "none",
                    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                    fontSize: "0.84rem"
                  }}
                />

                <button
                  type="submit"
                  style={{
                    justifySelf: "start",
                    border: "1px solid rgba(216, 174, 103, 0.34)",
                    borderRadius: "999px",
                    color: "var(--paper-ink)",
                    background:
                      "linear-gradient(145deg, var(--gold-light), var(--gold))",
                    padding: "9px 12px",
                    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                    fontSize: "0.74rem",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                  }}
                >
                  Senden
                </button>
              </form>
            </div>
          )}
        </div>
      </article>

      {editorOpen && (
        <EntryEditor
          entry={entry}
          onCancel={() => setEditorOpen(false)}
          onSave={handleSaveEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}