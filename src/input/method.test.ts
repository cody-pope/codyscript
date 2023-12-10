import { describe, expect, test } from "vitest";
import { Method, Methods } from "./method";
import { StackFrame } from "../stack";
import { Inputs } from "./index";

describe("method", async () => {
  test("can resolve empty method", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Method = {
      $: "m()",
      id: "blah",
      do: [],
      tag: "4",
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
      tag: "4",
      do: [
        {
          $: "ret",
          tag: "4",
          ret: {
            $: "val",
            val: 45,
            tag: "4",
          },
        },
      ],
    };
    await expect(Methods.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeTruthy();
    expect(frame.result).toBe(45);
  });

  test("can return constant method from index", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Method = {
      $: "m()",
      id: "blah",
      tag: "4",
      do: [
        {
          $: "ret",
          tag: "4",
          ret: {
            $: "val",
            tag: "4",
            val: 45,
          },
        },
      ],
    };
    await expect(Inputs.resolve({ frame, input })).resolves.toBe(45);
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
      tag: "4",
      do: [
        {
          $: "ret",
          tag: "4",
          ret: {
            $: "ref",
            ref: "a",
            tag: "4",
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
      tag: "4",
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
        {
          $: "ret",
          tag: "4",
          ret: {
            $: "val",
            tag: "4",
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
