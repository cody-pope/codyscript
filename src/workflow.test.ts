import { beforeEach, describe, expect, test } from "vitest";
import { Executors } from "./executor";
import { Workflow } from "./workflow";

describe("workflow", async () => {
  beforeEach(() => {
    Executors.clear();
  });

  test("can execute workflow with one step", async () => {
    const operationMetadata = { id: "add", exe: "local" };
    Executors.register("local", async (op, input) => {
      expect(op).toStrictEqual(operationMetadata);
      expect(input).toStrictEqual({ a: 1, b: 2 });
      return (input.a as number) + (input.b as number);
    });
    const workflow = new Workflow({
      meta: {
        out: "num3",
        do: [
          {
            in: { num1: "a", num2: "b" },
            out: "num3",
            op: { id: "add", exe: "local" },
          },
        ],
      },
      state: { pc: 0, vars: { num1: 1, num2: 2 } },
    });
    await expect(workflow.progress()).resolves.toBe(3);
  });

  test("can execute workflow with two steps", async () => {
    const op1 = { id: "add", exe: "local" };
    const op2 = { id: "add", exe: "local2" };
    Executors.register("local", async (op, input) => {
      expect(op).toStrictEqual(op1);
      expect(input).toStrictEqual({ a: 1, b: 2 });
      return (input.a as number) + (input.b as number);
    });
    Executors.register("local2", async (op, input) => {
      expect(op).toStrictEqual(op2);
      expect(input).toStrictEqual({ a: 3, b: 2 });
      return (input.a as number) * (input.b as number);
    });
    const workflow = new Workflow({
      meta: {
        out: "num4",
        do: [
          {
            in: { num1: "a", num2: "b" },
            out: "num3",
            op: { id: "add", exe: "local" },
          },
          {
            in: { num3: "a", num2: "b" },
            out: "num4",
            op: { id: "add", exe: "local2" },
          },
        ],
      },
      state: { pc: 0, vars: { num1: 1, num2: 2 } },
    });
    await expect(workflow.progress()).resolves.toBe(6);
  });

  test("can execute workflow from existing state", async () => {
    Executors.register("local2", async (op, input) => {
      return (input.a as number) + (input.b as number);
    });
    const workflow = new Workflow({
      meta: {
        out: "num4",
        do: [
          {
            in: { num1: "a", num2: "b" },
            out: "num3",
            op: { id: "add", exe: "local" },
          },
          {
            in: { num3: "a", num2: "b" },
            out: "num4",
            op: { id: "add", exe: "local2" },
          },
        ],
      },
      state: { pc: 1, vars: { num1: 1, num2: 2, num3: 88 } },
    });
    await expect(workflow.progress()).resolves.toBe(90);
  });

  test("can execute workflow with concurrent steps", async () => {
    Executors.register("local", async (op, input) => {
      return (input.a as number) + (input.b as number);
    });
    const workflow = new Workflow({
      meta: {
        out: "num5",
        do: [
          [
            {
              in: { num1: "a", num2: "b" },
              out: "num3",
              op: { id: "add", exe: "local" },
            },
            {
              in: { num1: "a", num2: "b" },
              out: "num4",
              op: { id: "add", exe: "local" },
            },
          ],
          {
            in: { num3: "a", num4: "b" },
            out: "num5",
            op: { id: "add", exe: "local" },
          },
        ],
      },
      state: { pc: 0, vars: { num1: 1, num2: 2 } },
    });
    await expect(workflow.progress()).resolves.toBe(6);
  });
});
