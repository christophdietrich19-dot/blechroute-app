export default function PolaroidCard({ item, tilted }) {
  return (
    <article className={tilted ? "polaroid tilted" : "polaroid"}>
      <img src={item.image} alt={item.title} />

      <div>
        <h3>{item.title}</h3>
        <p>{item.caption}</p>
        <span>{item.place}</span>
      </div>
    </article>
  );
}