// Decorative cartography only. Personal place data is rendered separately.
export function MapPaper({ className = "" }) {
  return (
    <div className={`map-paper ${className}`} style={{ backgroundImage: `linear-gradient(110deg, rgba(114,77,36,.08), transparent 40%, rgba(124,80,37,.12)), url("${import.meta.env.BASE_URL}textures/map-paper-v29.png")` }} aria-hidden="true">
      <svg viewBox="0 0 400 430" preserveAspectRatio="xMidYMid slice">
        <g className="map-contours">
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${-80 + i * 12},-20 C${170 + i * 6},80 ${-110 + i * 18},100 ${45 + i * 9},195 S${330 + i * 10},245 ${140 + i * 12},450`} />)}
          {Array.from({ length: 7 }, (_, i) => <path key={`b${i}`} d={`M${170 + i * 19},-20 Q${120 + i * 18},115 ${280 + i * 13},162 T${300 + i * 17},440`} />)}
        </g>
        <g className="map-woodland">
          <path d="M0 25 80 3 113 56 72 110 6 98Z M278 7 396 21 371 101 294 77Z M42 209 98 195 142 244 108 282 31 277Z M248 306 312 257 398 288 386 395 321 422 252 382Z" />
        </g>
        <path className="map-river" d="M364-12C323 47 353 64 292 112S304 207 229 244 240 312 180 360 153 414 126 449" />
        <g className="map-roads">
          <path d="M-20 365 49 309 53 259 121 210 152 173 166 117 220 82 240-10 M45 440 82 365 162 339 194 274 276 267 327 212 420 189 M-10 102 67 135 141 123 231 161 294 174 368 147 420 120" />
          <path d="M20-10 33 56 89 104 67 135 38 215 53 259 M49 309 121 307 194 274 193 208 231 161 M276 267 304 337 368 357 412 424" />
        </g>
        <g className="map-towns"><circle cx="67" cy="135" r="4"/><circle cx="152" cy="173" r="3"/><circle cx="53" cy="259" r="4"/><circle cx="194" cy="274" r="5"/><circle cx="327" cy="212" r="3"/><circle cx="82" cy="365" r="3"/></g>
        <g className="map-hatching"><path d="m10 185 14-8m-10 14 14-8m-10 14 14-8m266 40 14-8m-10 14 14-8m-10 14 14-8m-171 111 14-8m-10 14 14-8m-10 14 14-8" /></g>
      </svg>
    </div>
  );
}

export function CompassRose() {
  return <svg className="compass-rose" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="34"/><path d="M50 3 57 43 97 50 57 57 50 97 43 57 3 50 43 43Z M50 3V97M3 50H97M21 21 79 79M79 21 21 79"/><path d="m50 15 0 35 7-7Zm35 35H50l7 7ZM50 85V50l-7 7ZM15 50H50l-7-7Z" fill="currentColor"/><text x="50" y="9" textAnchor="middle">N</text></svg>;
}

export function RoadSketch() {
  return <svg className="road-sketch" viewBox="0 0 130 90" aria-hidden="true"><path d="M2 40 30 19 46 30 66 10 89 27 109 16 128 38M29 20l4 13 9-7M66 10l3 18 9-7M24 88c15-20 71-29 72-43S69 35 75 25M53 90c20-27 73-38 55-48S76 33 81 26"/><path d="M39 88c22-25 75-35 64-43S73 34 78 26" strokeDasharray="5 5"/></svg>;
}
