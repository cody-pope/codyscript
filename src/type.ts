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
