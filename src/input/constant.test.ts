import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Constant, Constants } from "./constant";
import { Inputs } from "./index";

describe("constant", async () => {
  test("can resolve string constant", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Constant = {
      $: "val",
      val: "a",
    };
    await expect(Constants.resolve({ frame, input })).resolves.toBe("a");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can resolve string constant from index", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Constant = {
      $: "val",
      val: "a",
    };
    await expect(Inputs.resolve({ frame, input })).resolves.toBe("a");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can resolve number constant", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    const input: Constant = {
      $: "val",
      val: 45,
    };
    await expect(Constants.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
