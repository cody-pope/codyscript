import { Registry } from "./registry";
import { ExecutionMeta, ExecutorMeta, Value } from "./type";

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

const executors = new Registry<Executor>({
  name: "executor",
  preventDuplicates: true,
  preventFalsy: true,
});

export const Executors = {
  register(exe: string | ExecutorMeta, executor: Executor) {
    executors.add(typeof exe === "string" ? exe : exe.id, executor);
  },
  load(exe: string | ExecutionMeta) {
    return executors.get(typeof exe === "string" ? exe : exe.id);
  },
  clear() {
    executors.clear();
  },
};
