import { afterEach, describe, expect, test } from "vitest";
import { Executor, executors, Executors } from "../executor";
import { Operation, Operations } from "./operation";
import { StackFrame } from "../stack";

describe("operation", async () => {
  afterEach(() => {
    executors.clear();
  });

  test("can call basic op", async () => {
    const executor: Executor = async ({ op, arg, input }) => {
      expect(op).toBe("blah");
      expect(arg).toBeUndefined();
      expect(input).toBeUndefined();
      return { value: 45 };
    };
    Executors.register("test", executor);
    const frame: StackFrame = {
      variables: {},
    };
    const input: Operation = {
      $: "op",
      op: {
        id: "blah",
      },
      exe: {
        id: "test",
      },
    };
    await expect(Operations.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can call op with exe arg", async () => {
    const executor: Executor = async ({ op, arg, input }) => {
      expect(op).toBe("blah");
      expect(arg).toBe("huh");
      expect(input).toBeUndefined();
      return { value: 45 };
    };
    Executors.register("test", executor);
    const frame: StackFrame = {
      variables: {},
    };
    const input: Operation = {
      $: "op",
      op: {
        id: "blah",
      },
      exe: {
        id: "test",
        arg: "huh",
      },
    };
    await expect(Operations.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can call op with exe args", async () => {
    const executor: Executor = async ({ op, arg, input }) => {
      expect(op).toBe("blah");
      expect(arg).toStrictEqual({
        a: "1",
        b: "2",
      });
      expect(input).toBeUndefined();
      return { value: 45 };
    };
    Executors.register("test", executor);
    const frame: StackFrame = {
      variables: {},
    };
    const input: Operation = {
      $: "op",
      op: {
        id: "blah",
      },
      exe: {
        id: "test",
        arg: {
          a: "1",
          b: "2",
        },
      },
    };
    await expect(Operations.resolve({ frame, input })).resolves.toBe(45);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });

  test("can call op with input vars", async () => {
    const executor: Executor = async ({ op, arg, input }) => {
      console.log("INPUT:", input);
      expect(op).toBe("blah");
      expect(arg).toBe("huh");
      expect(input).toStrictEqual({
        a: 3,
        b: 5,
      });
      return { value: (input.a as number) + (input.b as number) };
    };
    Executors.register("test", executor);
    const frame: StackFrame = {
      variables: {
        num1: 3,
        num2: 5,
      },
    };
    const input: Operation = {
      $: "op",
      op: {
        id: "blah",
        map: {
          a: { $: "ref", ref: "num1" },
          b: { $: "ref", ref: "num2" },
        },
      },
      exe: {
        id: "test",
        arg: "huh",
      },
    };
    await expect(Operations.resolve({ frame, input })).resolves.toBe(8);
    expect(frame.completed).toBeFalsy();
    expect(frame.result).toBeUndefined();
  });
});
