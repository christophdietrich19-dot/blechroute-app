export default function PolaroidCard({ item, tilted = false }) {
  return (
    <article className={tilted ? "polaroid tilted" : "polaroid"}>
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
      <span>{item.place}</span>
    </article>
  );
}