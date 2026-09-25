import { useId } from "react";

const source = `${import.meta.env.BASE_URL}design-v31/silbersee-lohsa-reference.jpg`;
export const LOHSA_COORDINATES = "51.39487° N, 14.39657° E";

// Display crops of the approved embedded PDF art, not a regenerated crest/lake.
// Luminance becomes ink opacity so the original dark photo background does not
// become a rectangular patch. The mockup's rounded coordinates are excluded.
function ApprovedEngraving() {
  const filterId = `engraving-${useId().replaceAll(":", "")}`;
  return (
    <svg viewBox="690 84 1040 414" aria-hidden="true">
      <defs><filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .2126 .7152 .0722 0 -.16" />
        <feComponentTransfer result="ink"><feFuncA type="linear" slope="2" /></feComponentTransfer>
        <feFlood floodColor="currentColor" /><feComposite operator="in" in2="ink" />
      </filter></defs>
      <image href={source} width="1800" height="602" filter={`url(#${filterId})`} />
    </svg>
  );
}

export function SilberseeArtwork() {
  return <figure className="silbersee-artwork" aria-label={`Silbersee mit Lohsa-Wappen. Lohsa: ${LOHSA_COORDINATES}`}>
    <ApprovedEngraving />
    <figcaption><span>51.39487° N</span><span>14.39657° E</span></figcaption>
  </figure>;
}

export function RegionalRoadbookPaper() {
  return <div className="regional-roadbook" aria-hidden="true">
    <div className="regional-paper-back" />
    <div className="regional-paper-map">
      {/* Reconstructed decorative art, not geographic or user journey data. */}
      <img className="regional-map-window" src={`${import.meta.env.BASE_URL}design-v32/roadbook-map-illustration.png`} alt="" decoding="async" />
      <span className="regional-lake-label">Silbersee</span>
      <small className="regional-coordinates">{LOHSA_COORDINATES}</small>
    </div>
  </div>;
}
