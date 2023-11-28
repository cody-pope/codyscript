type NumberType = "N";
type StringType = "S";
type BooleanType = "B";
type ListType = { L: Type };
type ObjectType = { O: { [name: string]: Type } };
export type Type =
  | NumberType
  | StringType
  | BooleanType
  | ListType
  | ObjectType;

type NumberValue = number;
type StringValue = string;
type BooleanValue = boolean;
type ListValue = Value[];
type ObjectValue = {
  [name: string]: Value;
};
export type Value =
  | NumberValue
  | StringValue
  | BooleanValue
  | ListValue
  | ObjectValue;

export type ExecutorMeta = {
  id: string;
  in?: { [arg: string]: Type };
};

export type ExecutionMeta = {
  id: string;
  in?: {
    [arg: string]: Value;
  };
};

export type OperationMeta = {
  id: string;
  exe: string | ExecutionMeta;
  in?: { [arg: string]: Type };
  out?: Type;
};

export type StepOperationMeta = {
  in?: { [arg: string]: string };
  out?: string;
  op: OperationMeta;
};

export type StepLoopMeta = {
  op: "loop";
  do: StepMeta[];
  while: OperationMeta;
};

export type OperationOrLoop = StepOperationMeta | StepLoopMeta;

export type StepMeta = OperationOrLoop | OperationOrLoop[];

export type WorkflowMeta = {
  in?: { [arg: string]: Type };
  out?: string;
  do: StepMeta[];
};

export type WorkflowState = {
  pc: number;
  vars: { [name: string]: Value };
};
