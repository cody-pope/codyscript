export class Registry<T> {
  private readonly inner: { [key: string]: T };

  constructor() {
    this.inner = {};
  }

  public add(key: string, value: T) {
    this.inner[key] = value;
  }

  public get(key: string) {
    return this.inner[key];
  }
}
