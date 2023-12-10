import { Resolver } from "./index";

export type Reference = {
  $: "ref";
  ref: string;
  tag: string;
};

export const References: Resolver<Reference> = {
  async resolve({ frame, input }) {
    return frame.variables[input.ref];
  },
};
