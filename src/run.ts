import { Type, Value } from "./type";

export interface OperationMetadata {
  op: string[];
  v: string;
  at: string;
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
