import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Condition, Conditions } from "./condition";

describe("condition", async () => {
  test("can return in the middle", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      if: {
        $: "val",
        val: true,
      },
      do: [
        {
          $: "ret",
          ret: {
            $: "val",
            val: 45,
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Conditions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return in the middle of the else", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      if: {
        $: "val",
        val: false,
      },
      do: [
        {
          $: "ret",
          ret: {
            $: "val",
            val: 45,
          },
        },
      ],
      el: [
        {
          $: "ret",
          ret: {
            $: "val",
            val: 46,
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Conditions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(46);
  });

  test("can not blow up if else doesn't exist", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      if: {
        $: "val",
        val: false,
      },
      do: [],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Conditions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can run multiple instructions on if", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      if: {
        $: "val",
        val: true,
      },
      do: [
        {
          $: "set",
          set: "test",
          to: {
            $: "val",
            val: 45,
          },
        },
        {
          $: "set",
          set: "test2",
          to: {
            $: "val",
            val: 46,
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Conditions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({
      test: 45,
      test2: 46,
    });
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can run multiple instructions on else", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      if: {
        $: "val",
        val: false,
      },
      do: [
        {
          $: "set",
          set: "test",
          to: {
            $: "val",
            val: 45,
          },
        },
        {
          $: "set",
          set: "test2",
          to: {
            $: "val",
            val: 46,
          },
        },
      ],
      el: [
        {
          $: "set",
          set: "test",
          to: {
            $: "val",
            val: 47,
          },
        },
        {
          $: "set",
          set: "test2",
          to: {
            $: "val",
            val: 48,
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Conditions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({
      test: 47,
      test2: 48,
    });
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
