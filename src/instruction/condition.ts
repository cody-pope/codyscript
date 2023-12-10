import { Input, Inputs } from "../input";
import { Handler, Instruction, Instructions } from "./index";

export type Condition = {
  $: "if";
  if: Input;
  do: Instruction[];
  el?: Instruction[];
  tag?: string;
};

export const Conditions: Handler<Condition> = {
  async handle({ frame, instruction }) {
    if (
      !frame.completed &&
      (await Inputs.resolve({ frame, input: instruction.if }))
    ) {
      for (let i = 0; !frame.completed && i < instruction.do.length; i++) {
        await Instructions.handle({ frame, instruction: instruction.do[i] });
      }
    } else if (instruction.el?.length) {
      for (let i = 0; !frame.completed && i < instruction.el.length; i++) {
        await Instructions.handle({ frame, instruction: instruction.el[i] });
      }
    }
  },
};
