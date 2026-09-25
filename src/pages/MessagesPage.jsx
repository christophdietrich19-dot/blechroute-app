import StitchedBorder from "../components/StitchedBorder";
import { useMemo, useState } from "react";
import AppHeader from "../components/AppHeader";
import { IconMail } from "../icons/Icons";

export default function MessagesPage({
  appState,
  activePage,
  onOpenFeed,
  onOpenMap,
  onOpenMenu,
  onOpenMessages,
  onOpenNotifications,
  unreadMessages,
  unreadNotifications,
  onSendMessage,
  onReadConversation
}) {
  const blockedHandles = new Set((appState.blockedProfiles || []).map((profile) => profile.key));
  const conversations = (appState.conversations || []).filter((conversation) =>
    !blockedHandles.has(`handle:${conversation.participant?.handle}`)
  );
  const [selectedId, setSelectedId] = useState(conversations[0]?.id || null);
  const [draft, setDraft] = useState("");
  const selected = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId),
    [conversations, selectedId]
  );

  function openConversation(id) {
    setSelectedId(id);
    onReadConversation(id);
  }

  function submitMessage(event) {
    event.preventDefault();
    const clean = draft.trim().slice(0, 1000);
    if (!clean || !selected) return;
    if (onSendMessage(selected.id, clean)) setDraft("");
  }

  return (
    <section className="screen-page messages-page">
      <AppHeader
        compact
        userProfile={appState.user}
        activePage={activePage}
        onOpenFeed={onOpenFeed}
        onOpenMap={onOpenMap}
        onOpenMenu={onOpenMenu}
        onOpenMessages={onOpenMessages}
        onOpenNotifications={onOpenNotifications}
        messageCount={unreadMessages}
        notificationCount={unreadNotifications}
      />

      <div className="section-head">
        <h2>Nachrichten</h2>
        <span>lokale Demo</span>
      </div>

      <div className="conversation-list">
        {conversations.map((conversation) => (
          <button
            className={selectedId === conversation.id ? "conversation-card active" : "conversation-card"}
            type="button"
            onClick={() => openConversation(conversation.id)}
            key={conversation.id}
          >
            <img src={conversation.participant.avatar} alt="" />
            <span>
              <strong>{conversation.participant.name}</strong>
              <small>{conversation.messages.at(-1)?.text || "Neue Unterhaltung"}</small>
            </span>
            {conversation.unread > 0 && <b>{conversation.unread}</b>}
          </button>
        ))}
      </div>

      {selected ? (
        <article className="chat-panel">
          <header>
            <IconMail />
            <div>
              <strong>{selected.participant.name}</strong>
              <small>Nachrichten werden nur auf diesem Gerät gespeichert.</small>
            </div>
          </header>

          <div className="chat-messages">
            {selected.messages.map((message) => (
              <p className={message.senderId === "self" || message.from === appState.user.name || message.from === "Christoph" ? "own" : ""} key={message.id}>
                <span>{message.text}</span>
                <small>{message.time}</small>
              </p>
            ))}
          </div>

          <form className="chat-compose" onSubmit={submitMessage}>
            <textarea
              value={draft}
              maxLength={1000}
              placeholder="Nachricht schreiben…"
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit">Senden</button>
          </form>
        </article>
      ) : (
        <article className="note-card"><StitchedBorder /><h2>Noch keine Unterhaltung.</h2></article>
      )}
    </section>
  );
}
