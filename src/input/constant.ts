import { Value } from "../type";
import { Resolver } from "./index";

export type Constant = {
  $: "val";
  val: Value;
};

export const Constants: Resolver<Constant> = {
  async resolve({ input }) {
    return input.val;
  },
};
