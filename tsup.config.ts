import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  minify: true,
  outDir: "dist",
  target: "esnext",
  entry: ["src/index.ts"],
  dts: {
    compilerOptions: {
      moduleResolution: "node",
    },
  },
  format: "esm",
};
