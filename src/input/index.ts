import { Reference, References } from "./reference";
import { Constant, Constants } from "./constant";
import { Operation, Operations } from "./operation";
import { StackFrame } from "../stack";
import { Method, Methods } from "./method";
import { Value } from "../value";

export type Input = Constant | Method | Operation | Reference;

export interface Resolver<T extends Input> {
  resolve({ frame, input }: { frame: StackFrame; input: T }): Promise<Value>;
}

export const Inputs: Resolver<Input> = {
  async resolve({ frame, input }) {
    if (input?.$ === "val") {
      return Constants.resolve({ frame, input });
    } else if (input?.$ === "ref") {
      return References.resolve({ frame, input });
    } else if (input?.$ === "op") {
      return Operations.resolve({ frame, input });
    } else if (input?.$ === "m()") {
      return Methods.resolve({ frame, input });
    } else {
      throw new Error(`Unknown input type ${input ? input["$"] : undefined}!`);
    }
  },
};
