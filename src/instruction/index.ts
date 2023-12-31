import { Set, Sets } from "./set";
import { Return, Returns } from "./return";
import { Loop, Loops } from "./loop";
import { Condition, Conditions } from "./condition";
import { StackFrame } from "../stack";

export { Condition } from "./condition";
export { Loop } from "./loop";
export { Return } from "./return";
export { Set } from "./set";
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
    if (instruction?.$ === "ret") {
      return Returns.handle({ frame, instruction });
    } else if (instruction?.$ === "set") {
      return Sets.handle({ frame, instruction });
    } else if (instruction?.$ === "for") {
      return Loops.handle({ frame, instruction });
    } else if (instruction?.$ === "if") {
      return Conditions.handle({ frame, instruction });
    } else {
      throw new Error(
        `Unknown instruction type ${
          instruction ? instruction["$"] : undefined
        }!`,
      );
    }
  },
};
