/// <reference types='vitest' />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/packages/app",
  server: {
    port: 4200,
    host: "localhost"
  },
  preview: {
    port: 4200,
    host: "localhost"
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components/ui/index.css": path.resolve(__dirname, "../components/src/index.css"),
      "@components/ui": path.resolve(__dirname, "../components/src/index.ts")
    }
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  test: {
    name: "@personia-crm/app",
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    coverage: {
      reportsDirectory: "./test-output/vitest/coverage",
      provider: "v8" as const
    }
  }
}));
