// Eliptic curver over real numbers
import { ntob } from "./utils.ts";

// Real numbers
export class Point {
  public x?: bigint;
  public y?: bigint;
  public a: bigint;
  public b: bigint;

  constructor(
    x: number | bigint | undefined,
    y: number | bigint | undefined,
    a: number | bigint,
    b: number | bigint,
  ) {
    this.a = ntob(a);
    this.b = ntob(b);

    if (x == undefined && y == undefined) {
      return;
    } else if (x == undefined || y == undefined) {
      throw new Error("x and y should be either both none-null or null");
    }

    this.x = ntob(x);
    this.y = ntob(y);

    if (!this.isValidPoint()) {
      throw new Error(`Point (${x}, ${y}) is not on the curve`);
    }
  }

  public new = (x?: bigint, y?:bigint) => new Point(x, y, this.a, this.b)

  public eq = (other: Point) => {
    return this.x == other.x && this.y == other.y && this.a == other.a &&
      this.b == other.b;
  };

  public add = (other: Point) => {
    if (this.a !== other.a || this.b !== other.b) {
      throw new Error("Points not on the same curve");
    }

    if (this.x == undefined) {
      return other;
    }

    if (other.x == undefined) {
      return this;
    }

    if (this.x === other.x) {
      return this.new()
    }

    const x1 = this.x as bigint
    const y1 = this.y as bigint

    if (this.eq(other)) {
      // P1 = P2 and y = 0.
      // => inifinite point
      if (this.y === 0n) {
        return this.new()
      }

      // P1 = P2
      const s = (3n * x1 ** 2n + this.a) / 2n * y1
      const x3 = s ** 2n - (2n * x1)
      const y3 = s * (x1 - x3) - y1
      return this.new(x3, y3)
    }

    const x2 = other.x as bigint
    const y2 = other.y as bigint

    const s = (y2 - y1) / (x2 - x1)
    const x3 = s ** 2n - x1 - x2
    const y3 = s * (x1 - x3) - y1
    return this.new(x3, y3)
  };

  public isValidPoint = () => {
    if (this.x == undefined || this.y == undefined) {
      return false;
    }

    return this.y ** 2n == (this.x ** 3n + this.a * this.x + this.b);
  };
}
