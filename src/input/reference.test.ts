import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Reference, References } from "./reference";
import { Inputs } from "./index";

describe("reference", async () => {
  test("can resolve ref", async () => {
    const frame: StackFrame = {
      variables: {
        a: 45,
        b: 46,
      },
    };
    const input: Reference = {
      $: "ref",
      ref: "a",
      tag: "4",
    };
    await expect(References.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can resolve ref from index", async () => {
    const frame: StackFrame = {
      variables: {
        a: 45,
        b: 46,
      },
    };
    const input: Reference = {
      $: "ref",
      ref: "a",
      tag: "4",
    };
    await expect(Inputs.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can resolve undefined ref", async () => {
    const frame: StackFrame = {
      variables: {
        b: 46,
      },
    };
    const input: Reference = {
      $: "ref",
      ref: "a",
      tag: "4",
    };
    await expect(References.resolve({ frame, input })).resolves.toBeUndefined();
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
