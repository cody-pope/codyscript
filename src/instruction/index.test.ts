import { describe, expect, test } from "vitest";
import { StackFrame } from "../stack";
import { Instruction, Instructions } from "./index";

describe("instruction", async () => {
  test("throws error when undefined instruction", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    await expect(() =>
      Instructions.handle({ frame, instruction: undefined }),
    ).rejects.toThrowError("Unknown instruction type undefined!");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("throws error when unknown instruction", async () => {
    const frame: StackFrame = {
      variables: {},
    };
    await expect(() =>
      Instructions.handle({ frame, instruction: {} as Instruction }),
    ).rejects.toThrowError("Unknown instruction type undefined!");
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
