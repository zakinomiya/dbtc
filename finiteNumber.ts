import { logger } from "./log.ts";
import { ntob } from "./utils.ts";

export const fnFactory = (prime: number | bigint) => (num: number | bigint) => new FiniteNum(ntob(num), ntob(prime))

export class FiniteNum {
  public num: bigint;
  public prime: bigint;

  constructor(num: number | bigint, prime: number | bigint) {
    num = ntob(num);
    prime = ntob(prime);

    if (num >= prime || num < 0) {
      throw new Error(`Num should be a number between 0 to ${prime - 1n}`);
    }

    this.num = ntob(num);
    this.prime = ntob(prime);
  }

  public print = () => {
    logger.info(`prime:${this.prime} num:${this.num}`);
  }

  public eq = (other: FiniteNum) => {
    return this.num === other.num && this.prime === other.prime;
  };

  public eqZero = () => {
    return this.num === 0n
  }

  public add = (other: FiniteNum | bigint) => {
    if (typeof other === "bigint") {
      return new FiniteNum((this.num + other) % this.prime, this.prime)
    }

    if (this.prime != other.prime) {
      throw new Error("Cannot add two Elements with different prime");
    }

    return new FiniteNum((this.num + other.num) % this.prime, this.prime);
  };

  public sub = (other: FiniteNum | bigint) => {
    if (typeof other === "bigint") {
      return new FiniteNum((this.num - other) % this.prime, this.prime)
    }

    if (this.prime != other.prime) {
      throw new Error("Cannot sub two Elements with different prime");
    }

    const n = (this.num - other.num) % this.prime;
    return new FiniteNum(n >= 0 ? n : n + this.prime, this.prime);
  };

  public mul = (other: FiniteNum | bigint) => {
    if (typeof other === "bigint") {
      return new FiniteNum((this.num * other) % this.prime, this.prime)
    }

    if (this.prime != other.prime) {
      throw new Error("Cannot multiply two Elements with different prime");
    }

    return new FiniteNum((this.num * other.num) % this.prime, this.prime);
  };

  public pow = (exp: number | bigint) => {
    let n = ntob(exp);
    while (n < 0) {
      n += this.prime - 1n;
    }

    return new FiniteNum((this.num ** n) % this.prime, this.prime);
  };

  public div = (other: FiniteNum | bigint) => {
    if (typeof other === "bigint") {
      return new FiniteNum((this.num / other) % this.prime, this.prime)
    }

    if (this.prime != other.prime) {
      throw new Error("Cannot divide two Elements with different prime");
    }

    return new FiniteNum(
      (this.num * other.pow(this.prime - 2n).num) % this.prime,
      this.prime,
    );
  };
}
