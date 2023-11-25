import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  minify: true,
  outDir: "dist",
  target: "es2020",
  entry: ["src/index.ts"],
  dts: true,
  format: "esm",
};
