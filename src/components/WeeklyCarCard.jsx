export default function WeeklyCarCard({ car }) {
  return (
    <article className="weekly-car">
      <img src={car.image} alt={car.headline} />

      <div>
        <p className="section-label">{car.title}</p>
        <h2>{car.headline}</h2>
        <p>{car.text}</p>
        <span>
          {car.author} · {car.place}
        </span>
      </div>
    </article>
  );
}