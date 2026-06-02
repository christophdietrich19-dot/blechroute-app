import { useState } from "react";
import { IconBookmark, IconHeart } from "../icons/Icons";

export default function DailyHighlight({ moment }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="daily-highlight">
      <div className="daily-polaroid">
        <img src={moment.image} alt={moment.headline} />

        <div>
          <h3>{moment.headline}</h3>
          <p>{moment.text}</p>
          <span>{moment.place}</span>
        </div>
      </div>

      <div className="daily-copy">
        <p className="section-label">{moment.title}</p>
        <h2>Dieser Moment bleibt.</h2>
        <p>
          Von {moment.author}. Ausgewählt, weil manchmal ein Bild reicht, um eine
          ganze Fahrt wieder zu fühlen.
        </p>

        <div className="daily-actions">
          <button
            className={liked ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setLiked((current) => !current)}
          >
            <IconHeart />
            <span>{liked ? "Behalten" : "Gefällt"}</span>
          </button>

          <button
            className={saved ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setSaved((current) => !current)}
          >
            <IconBookmark />
            <span>{saved ? "Gespeichert" : "Speichern"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}