import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Return, Returns } from "./return";

describe("return", async () => {
  test("can return constant", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Return = {
      $: "ret",
      ret: {
        $: "val",
        val: 45,
      },
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Returns.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return undefined", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Return = {
      $: "ret",
      ret: {
        $: "ref",
        ref: "test",
      },
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Returns.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBeUndefined();
  });
});
