import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Condition, Conditions } from "./condition";
import { Instructions } from "./index";

describe("condition", async () => {
  test("can return in the middle", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      tag: "4",
      if: {
        $: "val",
        val: true,
        tag: "1",
      },
      do: [
        {
          $: "ret",
          tag: "2",
          ret: {
            $: "val",
            tag: "3",
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
      tag: "4",
      $: "if",
      if: {
        tag: "4",
        $: "val",
        val: false,
      },
      do: [
        {
          $: "ret",
          tag: "4",
          ret: {
            tag: "4",
            $: "val",
            val: 45,
          },
        },
      ],
      el: [
        {
          tag: "4",
          $: "ret",
          ret: {
            tag: "4",
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
      tag: "4",
      if: {
        tag: "4",
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

  test("can not blow up if else doesn't exist from index", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Condition = {
      $: "if",
      tag: "4",
      if: {
        tag: "4",
        $: "val",
        val: false,
      },
      do: [],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Instructions.handle({ frame, instruction });
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
      tag: "4",
      if: {
        tag: "4",
        $: "val",
        val: true,
      },
      do: [
        {
          $: "set",
          tag: "4",
          set: "test",
          to: {
            $: "val",
            tag: "4",
            val: 45,
          },
        },
        {
          $: "set",
          set: "test2",
          tag: "4",
          to: {
            $: "val",
            tag: "4",
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
      tag: "4",
      if: {
        $: "val",
        val: false,
        tag: "4",
      },
      do: [
        {
          $: "set",
          tag: "4",
          set: "test",
          to: {
            $: "val",
            tag: "4",
            val: 45,
          },
        },
        {
          $: "set",
          tag: "4",
          set: "test2",
          to: {
            $: "val",
            tag: "4",
            val: 46,
          },
        },
      ],
      el: [
        {
          $: "set",
          set: "test",
          tag: "4",
          to: {
            $: "val",
            tag: "4",
            val: 47,
          },
        },
        {
          $: "set",
          set: "test2",
          tag: "4",
          to: {
            $: "val",
            tag: "4",
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
