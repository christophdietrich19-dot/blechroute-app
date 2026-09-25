import { useState } from "react";
import EntryEditor from "./EntryEditor";
import StitchedBorder from "./StitchedBorder";
import { IconBookmark, IconCar, IconClock, IconEdit, IconFlag, IconHeart, IconMapPin, IconRepeat, IconRoad, IconShare, IconUsers } from "../icons/Icons";
import { makeId } from "../utils/storage";
import { isOwnAuthor } from "../data/appSchema";

export default function RoadbookCard({
  entry,
  featured = false,
  currentUser,
  savedEntryIds = [],
  likedEntryIds = [],
  followingHandles = [],
  onToggleSavedEntry,
  onToggleLikedEntry,
  onToggleFollow,
  onUpdateEntry,
  onDeleteEntry,
  onOpenCommunityProfile,
  onReportEntry,
  onShareEntry,
  onRepostEntry
}) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);

  const likes = Number(entry.likes || 0);
  const likedByMe = likedEntryIds.includes(entry.id);
  const isSavedByMe = savedEntryIds.includes(entry.id);
  const saved = Number(entry.saved || 0) + (isSavedByMe ? 1 : 0);
  const comments = entry.comments || [];

  const author = entry.author || {
    name: currentUser?.name || "Christoph",
    handle: currentUser?.handle || "@christoph",
    avatar: currentUser?.avatar || entry.image,
    region: currentUser?.region || "Lausitz",
    bio: currentUser?.bio || "Roadbook Profil"
  };

  const isOwnEntry = isOwnAuthor(entry.author, currentUser);
  const following = followingHandles.includes(author.handle);

  function safeUpdate(updater) {
    if (onUpdateEntry) {
      onUpdateEntry(entry.id, updater);
    }
  }

  function handleLike() {
    onToggleLikedEntry?.(entry.id);
  }

  function handleSave() {
    if (onToggleSavedEntry) {
      onToggleSavedEntry(entry.id);
    }
  }

  function handleAddComment(event) {
    event.preventDefault();

    const cleanText = commentText.trim().slice(0, 500);

    if (!cleanText) {
      return;
    }

    const newComment = {
      id: makeId(),
      authorId: currentUser?.id,
      author: currentUser?.name || "Christoph",
      authorHandle: currentUser?.handle,
      text: cleanText
    };

    safeUpdate((currentEntry) => ({
      ...currentEntry,
      comments: [...(currentEntry.comments || []), newComment]
    }));

    setCommentText("");
    setCommentsOpen(true);
  }

  function handleEditComment(event) {
    event.preventDefault();
    const cleanText = editingCommentText.trim().slice(0, 500);
    if (!cleanText || editingCommentId === null) return;
    safeUpdate((currentEntry) => ({
      ...currentEntry,
      comments: (currentEntry.comments || []).map((comment) =>
        comment.id === editingCommentId && comment.authorId === currentUser?.id
          ? { ...comment, text: cleanText, edited: true }
          : comment
      )
    }));
    setEditingCommentId(null);
    setEditingCommentText("");
  }

  function handleDeleteComment(commentId) {
    if (!window.confirm("Deinen Kommentar wirklich löschen?")) return;
    safeUpdate((currentEntry) => ({
      ...currentEntry,
      comments: (currentEntry.comments || []).filter((comment) =>
        comment.id !== commentId || comment.authorId !== currentUser?.id
      )
    }));
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditingCommentText("");
    }
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
        <StitchedBorder />
        <div className="roadbook-author-row">
          <button className="roadbook-author-button"
            type="button"
            onClick={handleOpenAuthor}
          >
            <img
              src={author.avatar}
              alt={author.name}
            />

            <div>
              <strong>
                {author.name}
              </strong>

              <span>
                {author.handle} · {entry.date}
              </span>
            </div>
          </button>

          {isOwnEntry ? (
            <button
              className="roadbook-secondary-action"
              type="button"
              onClick={() => setEditorOpen(true)}
            >
              <IconEdit />
              <span>Ändern</span>
            </button>
          ) : (
            <button
              className="roadbook-secondary-action"
              type="button"
              onClick={() => onToggleFollow?.(author.handle)}
              aria-pressed={following}
            >
              {following ? "Folgt" : "Folgen"}
            </button>
          )}
        </div>

        <div className="roadbook-image">
          <img
            src={entry.image}
            alt={entry.title}
            loading="lazy"
            decoding="async"
          />
          <span className="paper-label">{entry.type}</span>

        </div>

        <div className="roadbook-content">
          <p className="section-label">{entry.subtitle}</p>
          <h2>{entry.title}</h2>
          <p>{entry.text}</p>

          <div className="roadbook-meta">
            <span><IconCar />{entry.vehicle}</span>
            <span><IconRoad />{entry.distance}</span>
            <span><IconClock />{entry.duration}</span>
            <span><IconUsers />{entry.visibility}</span>
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
              aria-pressed={likedByMe}
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
              <span>
                {comments.length} {comments.length === 1 ? "Kommentar" : "Kommentare"}
              </span>
            </button>

            <button className="soft-action" type="button" onClick={() => onShareEntry?.(entry)}>
              <IconShare />
              <span>Teilen</span>
            </button>

            <button className="soft-action" type="button" onClick={() => onRepostEntry?.(entry)}>
              <IconRepeat />
              <span>Repost</span>
            </button>

            {!isOwnEntry && (
              <button
                className="soft-action report-action"
                type="button"
                onClick={() => onReportEntry?.({
                  kind: "entry",
                  key: `entry:${entry.id}`,
                  label: `„${entry.title}“ von ${author.handle}`
                })}
              >
                <IconFlag />
                <span>Melden</span>
              </button>
            )}
          </div>

          {commentsOpen && (
            <div className="roadbook-comments">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    className="roadbook-comment"
                    key={comment.id}
                  >
                    {editingCommentId === comment.id ? (
                      <form className="comment-edit-form" onSubmit={handleEditComment}>
                        <textarea
                          value={editingCommentText}
                          maxLength={500}
                          aria-label="Kommentar bearbeiten"
                          onChange={(event) => setEditingCommentText(event.target.value)}
                        />
                        <div className="comment-own-actions">
                          <button type="submit" disabled={!editingCommentText.trim()}>Speichern</button>
                          <button type="button" onClick={() => setEditingCommentId(null)}>Abbrechen</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p>
                          <strong>
                            {comment.authorId === currentUser?.id ? currentUser.name : comment.author}
                          </strong>{" "}
                          {comment.text}{comment.edited ? " · bearbeitet" : ""}
                        </p>
                        {comment.authorId && comment.authorId === currentUser?.id && (
                          <div className="comment-own-actions">
                            <button type="button" onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditingCommentText(comment.text);
                            }}>Bearbeiten</button>
                            <button type="button" onClick={() => handleDeleteComment(comment.id)}>Löschen</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>
                  Noch keine Kommentare. Sag etwas zu diesem Moment.
                </p>
              )}

              <form className="roadbook-comment-form" onSubmit={handleAddComment}>
                <textarea
                  value={commentText}
                  maxLength={500}
                  placeholder="Kommentar schreiben..."
                  onChange={(event) => setCommentText(event.target.value)}
                />

                <button
                  type="submit"
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
