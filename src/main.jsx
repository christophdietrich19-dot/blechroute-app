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

document.documentElement.dataset.platform = import.meta.env.VITE_PLATFORM || "web";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
