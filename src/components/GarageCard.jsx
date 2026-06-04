export default function GarageCard({ vehicle }) {
  return (
    <article className="garage-card">
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
          <span>Garage</span>
        </div>
      </div>
    </article>
  );
}