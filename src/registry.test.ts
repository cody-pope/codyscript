import { describe, expect, test } from "vitest";
import { Registry } from "./registry";

describe("registry", async () => {
  test("can create simple registry", async () => {
    const registry = new Registry<string>();
    expect(registry.count()).toBe(0);
    registry.add("test", "value");
    expect(registry.get("test")).toBe("value");
    expect(registry.count()).toBe(1);
    registry.add("test", "value2");
    expect(registry.get("test")).toBe("value2");
    expect(registry.count()).toBe(1);
    registry.add("test2", "value3");
    expect(registry.get("test2")).toBe("value3");
    expect(registry.count()).toBe(2);
  });

  test("can add falsy by default", async () => {
    const registry = new Registry<boolean>();
    registry.add("test", undefined);
    expect(registry.get("test")).toBeUndefined();
    registry.add("test", null);
    expect(registry.get("test")).toBeNull();
    registry.add("test", false);
    expect(registry.get("test")).toBeFalsy();
  });

  test("can prevent duplicates", async () => {
    const registry = new Registry<boolean>({
      name: "blah",
      preventDuplicates: true,
    });
    expect(registry.count()).toBe(0);
    registry.add("test", true);
    expect(registry.get("test")).toBeTruthy();
    expect(registry.count()).toBe(1);
    expect(() => registry.add("test", false)).toThrowError(
      "Already registered test to blah registry!",
    );
    expect(registry.count()).toBe(1);
    expect(registry.get("test")).toBeTruthy();
  });

  test("can prevent falsy", async () => {
    const registry = new Registry<boolean>({
      name: "blah",
      preventFalsy: true,
    });
    expect(registry.count()).toBe(0);
    registry.add("test", true);
    expect(registry.get("test")).toBeTruthy();
    expect(registry.count()).toBe(1);
    expect(() => registry.add("test", false)).toThrowError(
      "Cannot add test to blah registry because it was falsy!",
    );
    expect(registry.count()).toBe(1);
    expect(registry.get("test")).toBeTruthy();
    expect(() => registry.get("test2")).toThrowError(
      "Object test2 not found in blah registry!",
    );
  });

  test("can clear", async () => {
    const registry = new Registry<boolean>({
      name: "blah",
    });
    registry.add("test", true);
    expect(registry.get("test")).toBeTruthy();
    expect(registry.count()).toBe(1);
    registry.clear();
    expect(registry.get("test")).toBeFalsy();
    expect(registry.count()).toBe(0);
  });
});
