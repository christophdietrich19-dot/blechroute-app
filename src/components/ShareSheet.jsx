import { IconRepeat, IconShare } from "../icons/Icons";

export default function ShareSheet({ entry, conversations = [], onClose, onForward, onSystemShare, onRepost }) {
  return (
    <div className="create-overlay form-overlay" role="presentation" onClick={onClose}>
      <section className="entry-form share-sheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <p className="section-label">Beitrag teilen</p>
        <h2>{entry.title}</h2>
        <p>Direkt an einen Demo-Chat senden oder über die Freigabe deines Geräts teilen.</p>

        <div className="share-recipient-list">
          {conversations.length === 0 && <p>Kein verfügbarer Demo-Chat vorhanden.</p>}
          {conversations.map((conversation) => (
            <button type="button" onClick={() => onForward(conversation.id)} key={conversation.id}>
              <img src={conversation.participant.avatar} alt="" />
              <span>An {conversation.participant.name} senden</span>
            </button>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onSystemShare}><IconShare /> Systemfreigabe</button>
          <button className="ghost-button" type="button" onClick={onRepost}><IconRepeat /> Reposten</button>
        </div>
        <button className="close-sheet" type="button" onClick={onClose}>Abbrechen</button>
      </section>
    </div>
  );
}
