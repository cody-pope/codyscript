import { Instruction, Instructions } from "../instruction";
import { Resolver } from "./index";

export type Method = {
  $: "m()";
  id: string;
  do: Instruction[];
};

export const Methods: Resolver<Method> = {
  async resolve({ frame, input }) {
    for (let i = 0; i < input.do.length && !frame.completed; i++) {
      await Instructions.handle({ frame, instruction: input.do[i] });
    }
    frame.completed = true;
    return frame.result;
  },
};
