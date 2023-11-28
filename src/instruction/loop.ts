import { Input } from "../input";
import { Instruction } from "./index";

export type Loop = {
  $: "for";
  if: Input;
  do: Instruction[];
};
