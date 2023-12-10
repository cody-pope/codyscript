import { Resolver } from "./index";
import { Value } from "../value";

export type Constant = {
  $: "val";
  val: Value;
  tag: string;
};

export const Constants: Resolver<Constant> = {
  async resolve({ input }) {
    return input.val;
  },
};
