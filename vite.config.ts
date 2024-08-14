import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import { viteStaticCopy } from "vite-plugin-static-copy";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "data/*",
          dest: "data",
        },
      ],
    }),
  ],
  base: "#/",
  define: {
    "process.env": process.env,
  },
});
