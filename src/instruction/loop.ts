import { Input, Inputs } from "../input";
import { Handler, Instruction, Instructions } from "./index";

export type Loop = {
  $: "for";
  if: Input;
  do: Instruction[];
  tag?: string;
};

export const Loops: Handler<Loop> = {
  async handle({ frame, instruction }) {
    while (
      !frame.completed &&
      (await Inputs.resolve({ frame, input: instruction.if }))
    ) {
      for (let i = 0; !frame.completed && i < instruction.do.length; i++) {
        await Instructions.handle({ frame, instruction: instruction.do[i] });
      }
    }
  },
};
