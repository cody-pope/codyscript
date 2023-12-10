import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Loop, Loops } from "./loop";
import { Executors } from "../executor";
import { Instructions } from "./index";

describe("loop", async () => {
  test("can return from infinite loop", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Loop = {
      $: "for",
      tag: "4",
      if: {
        $: "val",
        val: true,
        tag: "3",
      },
      do: [
        {
          $: "ret",
          ret: {
            $: "val",
            val: 45,
            tag: "1",
          },
          tag: "2",
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Loops.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return from infinite loop from index", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Loop = {
      $: "for",
      tag: "4",
      if: {
        $: "val",
        val: true,
        tag: "3",
      },
      do: [
        {
          $: "ret",
          tag: "2",
          ret: {
            $: "val",
            val: 45,
            tag: "1",
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Instructions.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({});
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can iterate 3 times", async () => {
    Executors.register("+", async ({ input }) => {
      return { value: (input.a as number) + (input.b as number) };
    });
    Executors.register("-", async ({ op, arg, input }) => {
      expect(op).toBe("-");
      expect(arg).toBeUndefined();
      expect(input.a).toBeGreaterThan(0);
      expect(input.b).toBe(1);
      return { value: (input.a as number) - (input.b as number) };
    });
    const frame: StackFrame = {
      variables: {
        test: 3,
        test2: 0,
      },
    };
    const instruction: Loop = {
      $: "for",
      tag: "10",
      if: {
        $: "ref",
        ref: "test",
        tag: "9",
      },
      do: [
        {
          $: "set",
          set: "test2",
          tag: "8",
          to: {
            $: "op",
            tag: "7",
            op: {
              id: "+",
              map: {
                a: {
                  $: "ref",
                  ref: "test2",
                  tag: "5",
                },
                b: {
                  $: "val",
                  val: 2,
                  tag: "6",
                },
              },
            },
            exe: {
              id: "+",
            },
          },
        },
        {
          $: "set",
          set: "test",
          tag: "4",
          to: {
            $: "op",
            tag: "3",
            op: {
              id: "-",
              map: {
                a: {
                  $: "ref",
                  ref: "test",
                  tag: "1",
                },
                b: {
                  $: "val",
                  val: 1,
                  tag: "2",
                },
              },
            },
            exe: {
              id: "-",
            },
          },
        },
      ],
    };
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
    await Loops.handle({ frame, instruction });
    expect(frame.variables).toStrictEqual({
      test: 0,
      test2: 6,
    });
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
