export default function PolaroidCard({ item, tilted = false }) {
  return (
    <article className={tilted ? "polaroid tilted" : "polaroid"}>
      <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
      <h3>{item.title}</h3>
      <p>{item.caption}</p>
      <span>{item.place}</span>
    </article>
  );
}
