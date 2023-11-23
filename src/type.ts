type ObjectType = {
  [name: string]: Type;
};

export type Type = "N" | "S" | "B" | { L: Type } | { O: ObjectType };

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
