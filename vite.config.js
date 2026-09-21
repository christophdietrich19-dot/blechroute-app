import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const isAndroid = process.env.VITE_PLATFORM === "android";

  return {
    base: isAndroid ? "/" : "/blechroute-app/",
    plugins: [react()],
    server: {
      host: true,
      port: 5173
    }
  };
});
