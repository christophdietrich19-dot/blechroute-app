// Transparent, pixel-sized thread: no photograph slices or repeated leather.
// SVG geometry follows the panel without stretching the thread or its corners.
export default function StitchedBorder({ round = false }) {
  const Shape = round ? "circle" : "rect";
  const geometry = round ? { cx: "50%", cy: "50%", r: "40%" } : { x: 8, y: 8, rx: 9 };
  return <i className={round ? "stitched-border round" : "stitched-border"} aria-hidden="true">
    <svg className="stitch-outline" width="100%" height="100%" focusable="false">
      {["holes", "shadow", "thread"].map(layer =>
        <Shape key={layer} {...geometry} className={`stitch-line stitch-${layer}`} vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  </i>;
}
