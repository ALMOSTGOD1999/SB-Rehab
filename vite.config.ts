import { defineConfig } from "vite";
import tanstackStart from "@tanstack/start/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss(), tsConfigPaths()],
});

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
