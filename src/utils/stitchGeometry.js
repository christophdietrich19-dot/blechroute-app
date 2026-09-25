// Decorative saddle stitches in CSS pixels. Paths are batched by material layer,
// so a large card does not create hundreds of individual DOM elements.
export function makeStitchGeometry(width, height, { round = false, radius = 14, inset = 8 } = {}) {
  if (width < 24 || height < 24) return null;
  const segments = [];
  const line = (x, y, dx, dy) => {
    const length = Math.hypot(dx, dy);
    if (length) segments.push({ length, at: s => ({ x: x + dx * s / length, y: y + dy * s / length, tx: dx / length, ty: dy / length }) });
  };
  const arc = (cx, cy, r, from, angle) => segments.push({
    length: r * angle,
    at: s => {
      const a = from + s / r;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), tx: -Math.sin(a), ty: Math.cos(a) };
    }
  });
  const f = n => n.toFixed(2);
  const xy = p => `${f(p.x)},${f(p.y)}`;
  let guide;
  if (round) {
    const r = Math.min(width, height) / 2 - 6;
    arc(width / 2, height / 2, r, -Math.PI / 2, Math.PI * 2);
    guide = `M${f(width / 2)},6a${f(r)},${f(r)} 0 1 1 0,${f(2 * r)}a${f(r)},${f(r)} 0 1 1 0,${f(-2 * r)}`;
  } else {
    const l = inset, t = inset, r = width - inset, b = height - inset;
    const c = Math.max(2, Math.min(radius - inset, (r - l) / 2, (b - t) / 2));
    line(l + c, t, r - l - 2 * c, 0);
    arc(r - c, t + c, c, -Math.PI / 2, Math.PI / 2);
    line(r, t + c, 0, b - t - 2 * c);
    arc(r - c, b - c, c, 0, Math.PI / 2);
    line(r - c, b, -(r - l - 2 * c), 0);
    arc(l + c, b - c, c, Math.PI / 2, Math.PI / 2);
    line(l, b - c, 0, -(b - t - 2 * c));
    arc(l + c, t + c, c, Math.PI, Math.PI / 2);
    guide = `M${f(l + c)},${f(t)}H${f(r - c)}Q${f(r)},${f(t)} ${f(r)},${f(t + c)}V${f(b - c)}Q${f(r)},${f(b)} ${f(r - c)},${f(b)}H${f(l + c)}Q${f(l)},${f(b)} ${f(l)},${f(b - c)}V${f(t + c)}Q${f(l)},${f(t)} ${f(l + c)},${f(t)}Z`;
  }
  const perimeter = segments.reduce((sum, segment) => sum + segment.length, 0);
  const count = Math.max(8, Math.round(perimeter / 7.4));
  const pitch = perimeter / count;
  const length = Math.min(4.7, pitch * .64);
  const pointAt = distance => {
    for (const segment of segments) {
      if (distance <= segment.length) return segment.at(distance);
      distance -= segment.length;
    }
    return segments[0].at(0);
  };
  const thread = [], holes = [], glints = [];
  for (let i = 0; i < count; i++) {
    const p = pointAt((i + .5) * pitch);
    const nx = -p.ty, ny = p.tx;
    // Small, deterministic variations avoid a ruler-drawn dashed border.
    const slant = .56 + .1 * Math.sin(i * 1.7);
    const start = { x: p.x - p.tx * length / 2 + nx * slant, y: p.y - p.ty * length / 2 + ny * slant };
    const end = { x: p.x + p.tx * length / 2 - nx * slant, y: p.y + p.ty * length / 2 - ny * slant };
    const middle = { x: p.x + nx * .26, y: p.y + ny * .26 };
    thread.push(`M${xy(start)}Q${xy(middle)} ${xy(end)}`);
    holes.push(`M${xy(start)}l.01,0M${xy(end)}l.01,0`);
    const bezier = t => ({
      x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * middle.x + t * t * end.x,
      y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * middle.y + t * t * end.y
    });
    glints.push(`M${xy(bezier(.2))}Q${xy(middle)} ${xy(bezier(.78))}`);
  }
  return { guide, thread: thread.join(""), holes: holes.join(""), glints: glints.join(""), count, pitch };
}
