import { Value } from "./type";

export type StackFrame = {
  variables: { [name: string]: Value };
  completed?: boolean;
  result?: Value;
};
