import { describe, expect, test } from "vitest";

import { Operations } from "./operation";

describe("math", async () => {
  test("a + b", async () => {
    const location = "./math.ts";
    await import(location);
    const op = await Operations.load("+");
    await expect(op({ a: 1, b: 2 })).resolves.toBe(3);
  });
});
