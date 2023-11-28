import { Resolver } from "./index";

export type Reference = {
  $: "ref";
  ref: string;
};

export const References: Resolver<Reference> = {
  async resolve({ frame, input }) {
    return frame.variables[input.ref];
  },
};
