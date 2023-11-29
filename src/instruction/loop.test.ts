import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Loop, Loops } from "./loop";
import { Executors } from "../executor";

describe("loop", async () => {
  test("can return from infinite loop", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const instruction: Loop = {
      $: "for",
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
    await Loops.handle({ frame, instruction });
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
      if: {
        $: "ref",
        ref: "test",
      },
      do: [
        {
          $: "set",
          set: "test2",
          to: {
            $: "op",
            op: {
              id: "+",
              map: {
                a: {
                  $: "ref",
                  ref: "test2",
                },
                b: {
                  $: "val",
                  val: 2,
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
          to: {
            $: "op",
            op: {
              id: "-",
              map: {
                a: {
                  $: "ref",
                  ref: "test",
                },
                b: {
                  $: "val",
                  val: 1,
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
