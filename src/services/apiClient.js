export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// Transport für den späteren Serveranschluss. Ohne konfigurierte HTTPS-URL
// wird keine Anfrage gesendet. Zugangsdaten werden hier nicht hinterlegt.
export function createApiClient(baseUrl, fetchImpl = fetch) {
  const parsed = new URL(baseUrl);
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("Die Blechroute-API benötigt eine HTTPS-Adresse.");
  }

  const origin = parsed.href.endsWith("/") ? parsed.href : `${parsed.href}/`;
  const allowedPath = new URL(origin).pathname;

  return Object.freeze({
    async request(path, { method = "GET", body, signal } = {}) {
      const url = new URL(path.replace(/^\/+/, ""), origin);
      if (url.origin !== parsed.origin || !url.pathname.startsWith(allowedPath)) {
        throw new Error("API-Pfad außerhalb der konfigurierten Adresse.");
      }

      const response = await fetchImpl(url, {
        method,
        credentials: "include",
        headers: body === undefined ? { Accept: "application/json" } : {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal
      });

      if (!response.ok) {
        throw new ApiError(`Die Anfrage ist fehlgeschlagen (${response.status}).`, response.status);
      }

      if (response.status === 204) return null;
      return response.json();
    }
  });
}
