import { IconMapPin } from "../icons/Icons";

export default function DailyHighlight({ moment }) {
  return (
    <article className="daily-highlight">
      <div className="daily-polaroid">
        <div className="polaroid-topline">
          <div className="mini-author">
            <img src={moment.image} alt={moment.author} />
            <div>
              <strong>Christoph Dietrich</strong>
              <small>
                <IconMapPin />
                {moment.place || "Lausitz"}
              </small>
            </div>
          </div>

          <span className="polaroid-time">heute</span>
        </div>

        <img src={moment.image} alt={moment.headline} />

        <div className="polaroid-caption-row">
          <h3>{moment.headline}</h3>
          <span>{moment.title}</span>
        </div>
      </div>

      <div className="daily-copy">
        <p className="section-label">{moment.title}</p>
        <h2>{moment.headline}</h2>
        <p>{moment.text}</p>
      </div>
    </article>
  );
}