export interface FunctionLoader {
  load(): Promise<(...args: never[]) => Promise<never>>;
}

export class Function {}
