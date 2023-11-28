import { Input } from "../input";
import { Instruction } from "./index";

export type Condition = {
  $: "if";
  if: Input;
  do: Instruction[];
  el: Instruction[];
};
