import { Input } from "../input";

export type Set = {
  $: "set";
  set: string;
  to: Input;
};
