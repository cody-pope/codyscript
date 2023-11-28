import { describe, expect, test } from "vitest";
import { Method, Methods } from "./method";
import { StackFrame } from "../stack";

describe("method", async () => {
  test("can resolve empty method", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Method = {
      $: "m()",
      id: "blah",
      do: [],
    };
    await expect(Methods.resolve({ frame, input })).resolves.toBeUndefined();
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBeUndefined();
  });

  test("can return constant method", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Method = {
      $: "m()",
      id: "blah",
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
    await expect(Methods.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return ref method", async () => {
    const frame: StackFrame = {
      variables: {
        a: 45,
      },
    };
    const input: Method = {
      $: "m()",
      id: "blah",
      do: [
        {
          $: "ret",
          ret: {
            $: "ref",
            ref: "a",
          },
        },
      ],
    };
    await expect(Methods.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return early", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Method = {
      $: "m()",
      id: "blah",
      do: [
        {
          $: "ret",
          ret: {
            $: "val",
            val: 45,
          },
        },
        {
          $: "ret",
          ret: {
            $: "val",
            val: 46,
          },
        },
      ],
    };
    await expect(Methods.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });
});
