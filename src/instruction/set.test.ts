import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Set, Sets } from "./set";

describe("set", async () => {
  test("can set to constant", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Set = {
      $: "set",
      set: "test",
      to: {
        $: "val",
        val: 45,
        tag: "2",
      },
      tag: "1",
    };
    await Sets.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({ test: 45 });
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can overwrite previous value", async () => {
    const frame: StackFrame = {
      variables: {
        test: 44,
      },
    };
    const instruction: Set = {
      $: "set",
      set: "test",
      to: {
        $: "val",
        val: 45,
        tag: "2",
      },
      tag: "1",
    };
    await Sets.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({ test: 45 });
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
