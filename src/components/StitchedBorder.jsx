import { useLayoutEffect, useRef, useState } from "react";
import { makeStitchGeometry } from "../utils/stitchGeometry";

// Actual short curved stitches, each seated in two small punctures. Resizing
// adds/removes stitches rather than stretching thread or corner photographs.
export default function StitchedBorder({ round = false }) {
  const host = useRef(null);
  const [geometry, setGeometry] = useState(null);
  useLayoutEffect(() => {
    const element = host.current;
    let pending;
    let previousSize = "";
    const measure = () => {
      const { width, height } = element.getBoundingClientRect();
      // offset dimensions are untransformed CSS pixels (pressed buttons can scale).
      const w = element.clientWidth || width, h = element.clientHeight || height;
      const radius = parseFloat(getComputedStyle(element.parentElement).borderTopLeftRadius) || 14;
      const key = `${w}:${h}:${radius}`;
      if (key === previousSize) return;
      previousSize = key;
      setGeometry(makeStitchGeometry(w, h, { round, radius }));
    };
    measure();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(measure);
    });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(pending); };
  }, [round]);
  return <i ref={host} className={round ? "stitched-border round" : "stitched-border"} aria-hidden="true" data-stitch-count={geometry?.count}>
    <svg className="stitch-outline" width="100%" height="100%" focusable="false">
      {geometry && <>
        <path d={geometry.guide} className="stitch-line stitch-groove" />
        <path d={geometry.holes} className="stitch-line stitch-holes" />
        <path d={geometry.thread} className="stitch-line stitch-shadow" />
        <path d={geometry.thread} className="stitch-line stitch-edge" />
        <path d={geometry.thread} className="stitch-line stitch-thread" />
        <path d={geometry.glints} className="stitch-line stitch-glint" />
      </>}
    </svg>
  </i>;
}
