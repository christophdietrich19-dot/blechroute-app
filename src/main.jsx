import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./styles.css";
import "./leather-v20.css";
import "./styles/pin-overrides-v19.css";
import "./styles/public-readiness-v20.css";
import "./styles/release-v21.css";
import "./styles/release-v22.css";
import "./styles/roadbook-redesign.css";
import "./styles/briefing-v29.css";
import "./styles/final-briefing-v31.css";
import "./styles/error-fixes-v32.css";

document.documentElement.dataset.platform = import.meta.env.VITE_PLATFORM || "web";
for (const [name, file] of Object.entries({
  "--br16-leather": "textures/leather-main.webp",
  "--br16-panel": "textures/leather-panel.webp",
  "--br16-button": "textures/leather-button-real.jpg",
  "--br16-paper": "textures/paper-polaroid.webp",
  "--br16-panel-frame": "overlays/leather-panel-v16.png",
  "--br16-frame": "overlays/leather-frame.png",
  "--br17-control": "overlays/leather-control-stitched-v17.png",
  "--br17-plus": "overlays/leather-plus-stitched-v17.png",
  "--br18-control-bar": "overlays/leather-control-bar-rugged-v18.png",
  "--br18-control": "overlays/leather-control-rugged-v18.png",
  "--br18-plus": "overlays/leather-plus-rugged-v18.png",
  "--story-leather": "textures/leather-reference-v29.png",
  "--story-stitch-h": "overlays/stitch-public-horizontal.png",
  "--story-stitch-v": "overlays/stitch-public-vertical.png",
  "--br30-frame": "overlays/leather-sewn-frame-v30.png",
  "--br30-leather": "textures/leather-cognac-v30.png",
  "--br30-pin": "overlays/brass-pin-v30.png",
  "--br31-paper": "textures/paper-polaroid.webp",
  "--br31-frame": "design-v31/silbersee-lohsa-reference.jpg"
})) {
  document.documentElement.style.setProperty(name, `url("${import.meta.env.BASE_URL}${file}")`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
