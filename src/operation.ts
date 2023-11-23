import { Type, Value } from "./type";
import { Registry } from "./registry";

export interface Operation {
  op: string[];
  v: string;

  in?: { [arg: string]: Type };
  out?: Type;

  load(): Promise<
    (args?: { [arg: string]: Value }) => Promise<Value | undefined>
  >;
}

export class Operations extends Registry<Operation> {
  private static inner: Registry<Operation>;

  private constructor() {
    super();
  }

  public static register(...operations: Operation[]) {
    for (const operation of operations) {
      this.instance().add(operation.op[operation.op.length - 1], operation);
    }
  }

  public static registerLoader() {}

  public static async load(name: string) {
    return this.instance().get(name)?.load();
  }

  private static instance() {
    if (!this.inner) {
      this.inner = new Operations();
    }
    return this.inner;
  }
}
