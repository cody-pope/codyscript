import { Type, Value } from "./type";
import { Registry } from "./registry";

const operationExecutors = new Registry<
  (...args: Value[]) => Promise<Value | undefined>
>();

export const registerOperationExecutor = (
  meta: OperationExecutionMetadata,
  executor: (...args: Value[]) => Promise<Value | undefined>,
) => {
  if (operationExecutors.get(meta.type)) {
    throw new Error(`Already registered executor ${meta.type}.`);
  }
  operationExecutors.add(meta.type, executor);
};

export interface OperationExecutionMetadata {
  type: string;

  [meta: string]: string;
}

export interface OperationMetadata {
  op: string[];
  v: string;
  at: OperationExecutionMetadata;
  in?: { [arg: string]: Type };
  out?: Type;
}

export interface StepMetadata {
  in?: { [arg: string]: string };
  out?: string;
  op: OperationMetadata;
}

export interface WorkflowMetadata {
  in?: { [arg: string]: Type };
  out?: Type;
  do?: StepMetadata[];
}

export interface WorkflowState {
  pc?: number;
  vars?: { [name: string]: Value };
}

export class Workflow {
  private meta: WorkflowMetadata;
  private state: WorkflowState;

  constructor({
    meta,
    state,
  }: {
    meta: WorkflowMetadata;
    state: WorkflowState;
  }) {
    this.meta = meta;
    this.state = state;
    if (!this.state.pc) {
      this.state.pc = 0;
    }
    // TODO validate input
  }

  async progress() {
    // while (this.state.pc >= 0 && this.state.pc < this.meta.do.length) {
    //   const step = this.meta.do[this.state.pc];
    // }
    // let input;
    // if (step.in) {
    //   input = {};
    // }
    // TODO load operation
    // TODO execute operation
    // TODO store state
  }
}
