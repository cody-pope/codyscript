import { Value } from "./value";

export type StackFrame = {
  variables: { [name: string]: Value };
  completed?: boolean;
  result?: Value;
};
