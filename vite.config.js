import { defineConfig } from "vite";

export default defineConfig({
  base: "/ko-dany.github.io-ci-cd-pipeline-workshop/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
