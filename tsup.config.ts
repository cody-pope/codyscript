import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  minify: true,
  outDir: "dist",
  target: "es2020",
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  dts: true,
  format: "esm",
};
