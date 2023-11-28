import { Resolver } from "./index";
import { executors } from "../executor";
import { Value } from "../value";

export type Operation = {
  $: "op";
  op: {
    id: string;
    map?: {
      [ref: string]: string;
    };
  };
  exe: {
    id: string;
    arg?:
      | Value
      | {
          [arg: string]: Value;
        };
  };
};

export const Operations: Resolver<Operation> = {
  async resolve({ frame, input: op }) {
    const func = executors.get(op.exe.id);
    let input: { [arg: string]: Value } | undefined;
    if (op.op.map) {
      input = {};
      Object.entries(op.op.map).map(([from, to]) => {
        input[to] = frame.variables[from];
      });
    }
    const result = await func({ op: op.op.id, arg: op.exe.arg, input });
    if (result) {
      return result.value;
    }
  },
};
