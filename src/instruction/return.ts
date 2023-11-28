import { Input, Inputs } from "../input";
import { Handler } from "./index";

export type Return = {
  $: "ret";
  ret: Input;
};

export const Returns: Handler<Return> = {
  async handle({ frame, instruction }) {
    frame.result = await Inputs.resolve({ frame, input: instruction.ret });
    frame.completed = true;
  },
};
