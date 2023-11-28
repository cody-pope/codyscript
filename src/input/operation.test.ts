import { afterEach, describe, expect, test } from "vitest";
import { Executor, Executors } from "../executor";
import { Operation, Operations } from "./operation";
import { StackFrame } from "../stack";

describe("operation", async () => {
  afterEach(() => {
    Executors.clear();
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
          num1: "a",
          num2: "b",
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