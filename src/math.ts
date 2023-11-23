import { Operations } from "./operation";

Operations.register({
  op: ["math", "+"],
  v: "1.0.0",
  in: { a: "N", b: "N" },
  out: "N",
  async load() {
    return async ({ a, b }: { a: number; b: number }) => a + b;
  },
});
