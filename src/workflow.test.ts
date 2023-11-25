import { beforeEach, describe, expect, test } from "vitest";
import { Executors } from "./executor";
import { Workflow } from "./workflow";

describe("workflow", async () => {
  beforeEach(() => {
    Executors.clear();
  });

  test("can execute simple workflow", async () => {
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

  test("can execute simple workflow", async () => {
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
});
