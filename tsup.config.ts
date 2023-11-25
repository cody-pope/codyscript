import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  minify: true,
  outDir: "dist",
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  dts: true,
  cjsInterop: true,
  bundle: true,
  format: ["cjs", "esm", "iife"],
};
