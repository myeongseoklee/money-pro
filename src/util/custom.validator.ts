export class CustomValidator {
  static isNullOrUndefined<T>(obj: T | null | undefined): boolean {
    return typeof obj === 'undefined' || obj === null;
  }
}
