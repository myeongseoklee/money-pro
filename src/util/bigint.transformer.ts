export class BigIntTransformer {
  static toBigint(value: string | number): bigint {
    return BigInt(value);
  }

  static toNumber(value: bigint): number {
    return Number(value);
  }

  static toString(value: bigint): string {
    return value.toString();
  }
}
