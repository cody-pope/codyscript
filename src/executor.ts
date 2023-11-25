import { Registry } from "./registry";
import { ExecutionMetadata, Executor, ExecutorMetadata } from "./types";

const executors = new Registry<Executor>({
  name: "executor",
  preventDuplicates: true,
  preventFalsy: true,
});

export const Executors = {
  register(exe: string | ExecutorMetadata, executor: Executor) {
    executors.add(typeof exe === "string" ? exe : exe.id, executor);
  },
  load(exe: string | ExecutionMetadata) {
    return executors.get(typeof exe === "string" ? exe : exe.id);
  },
  clear() {
    executors.clear();
  },
};
