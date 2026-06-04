export default function GarageCard({ vehicle, onOpen }) {
  return (
    <article
      className="garage-card"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      style={{
        cursor: "pointer"
      }}
    >
      <img src={vehicle.image} alt={vehicle.name} />

      <div>
        <p className="section-label">{vehicle.status}</p>
        <h2>{vehicle.name}</h2>

        <p>
          {vehicle.year} · {vehicle.type} · {vehicle.engine}
        </p>

        <small>{vehicle.story}</small>

        <div className="roadbook-meta">
          <span>{vehicle.visibility}</span>
          <span>Fahrzeugakte öffnen</span>
        </div>
      </div>
    </article>
  );
}