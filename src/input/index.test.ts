import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Input, Inputs } from "./index";

describe("input", async () => {
  test("throws error when undefined input", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    await expect(() =>
      Inputs.resolve({ frame, input: undefined }),
    ).rejects.toThrowError("Unknown input type undefined!");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("throws error when unknown input", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    await expect(() =>
      Inputs.resolve({ frame, input: {} as Input }),
    ).rejects.toThrowError("Unknown input type undefined!");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
