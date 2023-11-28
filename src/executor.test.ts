import { afterEach, describe, expect, test } from "vitest";
import { executors, Executors } from "./executor";

describe("executor", async () => {
  afterEach(() => {
    executors.clear();
  });

  test("can register executor by string", async () => {
    const executor = async () => {};
    Executors.register("test", executor);
    expect(executors.get("test")).toBe(executor);
  });

  test("prevents duplicate executors", async () => {
    const executor = async () => {};
    const executor2 = async () => {};
    Executors.register("test", executor);
    expect(executors.get("test")).toBe(executor);
    expect(() => Executors.register("test", executor2)).toThrowError(
      "Already registered test to executor registry!",
    );
    expect(executors.get("test")).toBe(executor);
  });

  test("prevents undefined executors", async () => {
    expect(() => Executors.register("test", undefined)).toThrowError(
      "Cannot add test to executor registry because it was falsy!",
    );
    expect(() => executors.get("test")).toThrowError(
      "Object test not found in executor registry!",
    );
  });
});
