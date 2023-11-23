import { describe, expect, test } from "vitest";

import { Operations } from "./operation";

describe("operations", async () => {
  test("can register and load an operation without args", async () => {
    const name = "testOperation";
    const result = "test";
    Operations.register({
      op: ["math", name],
      v: "1.0.0",
      async load() {
        return async () => {
          return result;
        };
      },
    });
    const op = await Operations.load(name);
    await expect(op()).resolves.toBe(result);
  });

  test("can register and load an operation with basic args", async () => {
    const name = "add";
    Operations.register({
      op: ["math", name],
      v: "1.0.0",
      async load() {
        return async ({ a, b }: { a: number; b: number }) => {
          return a + b;
        };
      },
    });
    const op = await Operations.load(name);
    await expect(op({ a: 1, b: 2 })).resolves.toBe(3);
  });
});
