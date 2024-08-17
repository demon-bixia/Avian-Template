import { defineConfig } from "vite";
import alias from "@rollup/plugin-alias";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

const rootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), alias()],
  resolve: {
    alias: {
      "@src": resolve(rootDir, "src"),
      "@custom_types": resolve(rootDir, "src/@custom_types"),
    },
  },
});
