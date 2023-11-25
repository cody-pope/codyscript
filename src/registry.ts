export class Registry<T> {
  private readonly name?: string;
  private readonly preventDuplicates?: boolean;
  private readonly preventFalsy?: boolean;
  private inner: { [key: string]: T };

  constructor(params?: {
    name?: string;
    preventDuplicates?: boolean;
    preventFalsy?: boolean;
  }) {
    this.inner = {};
    this.name = params?.name;
    this.preventDuplicates = params?.preventDuplicates;
    this.preventFalsy = params?.preventFalsy;
  }

  public add(key: string, value: T) {
    if (this.preventDuplicates && this.inner[key]) {
      throw new Error(`Already registered ${key} to ${this.name} registry!`);
    }
    if (this.preventFalsy && !value) {
      throw new Error(
        `Cannot add ${key} to ${this.name} registry because it was falsy!`,
      );
    }
    this.inner[key] = value;
  }

  public get(key: string) {
    if (this.preventFalsy && !this.inner[key]) {
      throw new Error(`Object ${key} not found in ${this.name} registry!`);
    }
    return this.inner[key];
  }

  public count() {
    return Object.entries(this.inner).length;
  }

  public clear() {
    this.inner = {};
  }
}
