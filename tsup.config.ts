import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  minify: true,
  outDir: "dist",
  entry: ["src/index.ts"],
  dts: true,
  format: ["cjs", "esm"],
};
