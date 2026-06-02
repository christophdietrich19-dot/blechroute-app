import { useState } from "react";
import { IconBookmark, IconHeart } from "../icons/Icons";

export default function RoadbookCard({ entry, featured = false }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className={featured ? "roadbook-card featured" : "roadbook-card"}>
      <div className="roadbook-image">
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

        <div className="roadbook-actions">
          <button
            className={liked ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setLiked((current) => !current)}
          >
            <IconHeart />
            <span>{liked ? entry.likes + 1 : entry.likes}</span>
          </button>

          <button
            className={saved ? "soft-action active" : "soft-action"}
            type="button"
            onClick={() => setSaved((current) => !current)}
          >
            <IconBookmark />
            <span>{saved ? entry.saved + 1 : entry.saved}</span>
          </button>
        </div>
      </div>
    </article>
  );
}