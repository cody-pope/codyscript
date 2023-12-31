import { Registry } from "./registry";
import { Value } from "./value";

export type Executor = ({
  op,
  arg,
  input,
}: {
  op: string;
  arg?:
    | Value
    | {
        [arg: string]: Value;
      };
  input?: { [arg: string]: Value };
}) => Promise<{ value?: Value } | void>;

export const executors = new Registry<Executor>({
  name: "executor",
  preventDuplicates: true,
  preventFalsy: true,
});

export const Executors = {
  register(exe: string, executor: Executor) {
    executors.add(exe, executor);
  },
};
