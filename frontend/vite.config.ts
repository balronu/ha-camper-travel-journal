import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../custom_components/camper_travel_journal/frontend",
    emptyOutDir: true,
    lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "camper-travel-journal.js" },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
