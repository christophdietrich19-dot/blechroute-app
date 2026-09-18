import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, details) {
    console.error("Blechroute konnte nicht dargestellt werden.", error, details);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="fatal-error" role="alert">
        <p className="section-label">Blechroute</p>
        <h1>Die Oberfläche konnte nicht geladen werden.</h1>
        <p>
          Deine lokal gespeicherten Änderungen bleiben erhalten. Lade die App
          neu und versuche es noch einmal.
        </p>
        <button type="button" onClick={() => window.location.reload()}>
          App neu laden
        </button>
      </main>
    );
  }
}
