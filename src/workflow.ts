import { StepMetadata, Value, WorkflowMetadata, WorkflowState } from "./types";
import { Executors } from "./executor";

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
  }

  async progress() {
    if (!this.state.pc) {
      this.state.pc = 0;
    }
    while (this.state.pc >= 0 && this.state.pc < this.meta.do.length) {
      const step = this.meta.do[this.state.pc];
      if (step instanceof Array) {
        const results = await Promise.all(
          step.map((concurrent_step) => this.execute(concurrent_step)),
        );
        results.forEach((result, index) => {
          if (step[index].out && result) {
            this.state.vars[step[index].out] = result;
          }
        });
      } else {
        const result = await this.execute(step);
        if (step.out && result) {
          this.state.vars[step.out] = result;
        }
      }
      this.state.pc++;
    }
    if (this.meta.out) {
      return this.state.vars[this.meta.out];
    }
  }

  private async execute(step: StepMetadata) {
    const op = Executors.load(step.op.exe);
    const input: { [arg: string]: Value } = {};
    if (step.in) {
      Object.entries(step.in).map(([from, to]) => {
        input[to] = this.state.vars[from];
      });
    }
    return op(step.op, input);
  }
}
