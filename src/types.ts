export type Types =
  | "N"
  | "S"
  | "B"
  | { L: Types }
  | { O: { [name: string]: Types } };

type PrimitiveValue = number | string | boolean;
type ObjectValue = {
  [name: string]:
    | PrimitiveValue
    | ObjectValue
    | (PrimitiveValue | ObjectValue)[];
};
export type Value =
  | PrimitiveValue
  | ObjectValue
  | (PrimitiveValue | ObjectValue)[];

export type Executor = (
  op: OperationMetadata,
  input?: { [arg: string]: Value },
) => Promise<Value | void>;

export type ExecutorMetadata = {
  id: string;
  in?: { [arg: string]: Types };
};

export type ExecutionMetadata = {
  id: string;
  in?: {
    [arg: string]: Value;
  };
};

export type OperationMetadata = {
  id: string;
  exe: string | ExecutionMetadata;
  in?: { [arg: string]: Types };
  out?: Types;
};

export type StepMetadata = {
  in?: { [arg: string]: string };
  out?: string;
  wait?: boolean;
  op: OperationMetadata;
};

export type WorkflowMetadata = {
  in?: { [arg: string]: Types };
  out?: string;
  do: StepMetadata[];
};

export type WorkflowState = {
  pc: number;
  vars: { [name: string]: Value };
};
