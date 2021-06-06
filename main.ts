import { logger } from "./log.ts";

const ntob = (n: number | bigint) => typeof n == "bigint" ? n : BigInt(n)

export class FieldElement {
  public num: bigint;
  public prime: bigint;

  constructor(num: number | bigint, prime: number | bigint) {
    if (num >= prime || num < 0) {
      throw new Error(`Num should be a number between 0 to ${BigInt(prime) - 1n}`);
    }

    logger.debug(`[DEBUG] prime:${prime} num:${num}`);
    this.num = ntob(num)
    this.prime = ntob(prime)
  }

  public eq(other: FieldElement) {
    return this.num == other.num && this.prime == other.prime;
  }

  public add(other: FieldElement) {
    if (this.prime != other.prime) {
      throw new Error("Cannot add two Elements with different prime");
    }
    return new FieldElement((this.num + other.num) % this.prime, this.prime);
  }

  public sub(other: FieldElement) {
    if (this.prime != other.prime) {
      throw new Error("Cannot sub two Elements with different prime");
    }
    const n = (this.num - other.num) % this.prime;
    return new FieldElement(n >= 0 ? n : n + this.prime, this.prime);
  }

  public mul(other: FieldElement) {
    if (this.prime != other.prime) {
      throw new Error("Cannot multiply two Elements with different prime");
    }

    return new FieldElement((this.num * other.num) % this.prime, this.prime);
  }

  public pow(exp: number | bigint) {
    let n = ntob(exp);
    while (n < 0) {
      n += this.prime - 1n;
    }

    return new FieldElement((this.num ** n) % this.prime, this.prime);
  }

  public div(other: FieldElement) {
    if (this.prime != other.prime) {
      throw new Error("Cannot divide two Elements with different prime");
    }

    return new FieldElement(
      (this.num * other.pow(this.prime - 2n).num) % this.prime,
      this.prime,
    );
  }
}

(function main() {
  // const _fe = new FieldElement(8, 9);
})();
