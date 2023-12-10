import { Input, Inputs, Resolver } from "./index";
import { executors } from "../executor";
import { Value } from "../value";

export type Operation = {
  $: "op";
  op: {
    id: string;
    map?: {
      [arg: string]: Input;
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
  tag?: string;
};

export const Operations: Resolver<Operation> = {
  async resolve({ frame, input: op }) {
    const func = executors.get(op.exe.id);
    let input: { [arg: string]: Value } | undefined;
    if (op.op.map) {
      input = {};
      await Promise.all(
        Object.entries(op.op.map).map(async ([to, from]) => {
          input[to] = await Inputs.resolve({ frame, input: from });
        }),
      );
    }
    const result = await func({ op: op.op.id, arg: op.exe.arg, input });
    if (result) {
      return result.value;
    }
  },
};
