import { afterEach, describe, expect, test } from "vitest";
import { Executors } from "./executor";

describe("executor", async () => {
  afterEach(() => {
    Executors.clear();
  });

  test("can register executor by string", async () => {
    const executor = async () => {};
    Executors.register("test", executor);
    expect(Executors.load("test")).toBe(executor);
  });

  test("prevents duplicate executors", async () => {
    const executor = async () => {};
    const executor2 = async () => {};
    Executors.register("test", executor);
    expect(Executors.load("test")).toBe(executor);
    expect(() => Executors.register("test", executor2)).toThrowError(
      "Already registered test to executor registry!",
    );
    expect(Executors.load("test")).toBe(executor);
  });

  test("prevents undefined executors", async () => {
    expect(() => Executors.register("test", undefined)).toThrowError(
      "Cannot add test to executor registry because it was falsy!",
    );
    expect(() => Executors.load("test")).toThrowError(
      "Object test not found in executor registry!",
    );
  });
});
