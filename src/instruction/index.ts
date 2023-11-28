import { Set } from "./set";
import { Return, Returns } from "./return";
import { Loop } from "./loop";
import { Condition } from "./condition";
import { StackFrame } from "../stack";

export type Instruction = Condition | Loop | Return | Set;

export interface Handler<T extends Instruction> {
  handle({
    frame,
    instruction,
  }: {
    frame: StackFrame;
    instruction: T;
  }): Promise<void>;
}

export const Instructions: Handler<Instruction> = {
  async handle({ frame, instruction }) {
    if (instruction.$ === "ret") {
      return Returns.handle({ frame, instruction });
    } else {
      throw new Error(`Unknown instruction type ${instruction["$"]}!`);
    }
  },
};
