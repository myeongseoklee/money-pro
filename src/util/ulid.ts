import { monotonicFactory } from 'ulid';

export class Ulid {
  static createUlid(): string {
    const ulid = monotonicFactory();
    return ulid();
  }
}
