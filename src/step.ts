import { Operation } from "./operation";

export interface Step {
  in?: { [name: string]: string };
  out?: string;
  op: Operation;
}
