import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  clean: true,
  outDir: "./dist",
});
