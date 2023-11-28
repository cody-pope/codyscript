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
