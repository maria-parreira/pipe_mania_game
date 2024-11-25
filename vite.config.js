import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

export default defineConfig({
  build: {
    outDir: "dist",
    target: "esnext",
    modulePreload: true,
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  plugins: [
    copy({
      targets: [{ src: "src/assets/*", dest: "dist/assets" }],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
});
