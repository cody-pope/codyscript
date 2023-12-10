import { Input, Inputs } from "../input";
import { Handler } from "./index";

export type Set = {
  $: "set";
  set: string;
  to: Input;
  tag?: string;
};

export const Sets: Handler<Set> = {
  async handle({ frame, instruction }) {
    frame.variables[instruction.set] = await Inputs.resolve({
      frame,
      input: instruction.to,
    });
  },
};
