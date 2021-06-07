// Elliptic curve over finite numbers
import { FiniteNum } from "./finiteNumber.ts";

export const pointFactory = <T extends FiniteNum>(a: FiniteNum, b: FiniteNum) =>
  (x?: FiniteNum, y?: FiniteNum) => new Point(x, y, a, b);

// Real numbers
export class Point<T extends FiniteNum> {
  public x?: FiniteNum<T>;
  public y?: FiniteNum<T>;
  public a: FiniteNum<T>;
  public b: FiniteNum<T>;

  constructor(
    x: FiniteNum<T> | undefined,
    y: FiniteNum<T> | undefined,
    a: FiniteNum<T>,
    b: FiniteNum<T>,
  ) {
    this.a = a;
    this.b = b;

    if (x == undefined && y == undefined) {
      return;
    } else if (x == undefined || y == undefined) {
      throw new Error("x and y should be either both none-null or null");
    }

    this.x = x;
    this.y = y;

    if (!this.isOnTheCurve()) {
      throw new Error(`Point (${x.num}, ${y.num}) is not on the curve`);
    }
  }

  public new = (x?: FiniteNum<T>, y?: FiniteNum<T>) =>
    new Point<T>(x, y, this.a, this.b);

  public eq = (other: Point<T>) => {
    // return this.x == other.x && this.y == other.y && this.a == other.a && this.b == other.b;
    if (this.x == undefined || this.y == undefined) {
      return other.x == undefined && other.y == undefined &&
        this.a.eq(other.a) && this.b.eq(other.b);
    }

    return (this.x.eq(other.x as FiniteNum<T>)) &&
      this.y.eq(other.y as FiniteNum<T>) && this.a.eq(other.a) &&
      this.b.eq(other.b);
  };

  public add = (other: Point<T>) => {
    if (!this.a.eq(other.a) || !this.b.eq(other.b)) {
      throw new Error("Points not on the same curve");
    }

    if (this.x == undefined) {
      return other;
    }

    if (other.x == undefined) {
      return this;
    }

    const x1 = this.x as FiniteNum<T>;
    const y1 = this.y as FiniteNum<T>;

    if (this.eq(other)) {
      // P1 = P2 and y = 0.
      // => inifinite point
      if (y1.eqZero()) {
        y1.print()
        return this.new();
      }

      // P1 = P2
      // (3 * x1 ** 2 + this.a) / (2 * y1)
      const s = this.a.add(x1.pow(2n).mul(3n)).div(y1.mul(2n));
      s.print()
      // x3 = s ** 2 - (2 * x1)
      const x3 = s.pow(2n).sub(x1.mul(2n));
      x3.print()
      // y3 = s * (x1 - x3) - y1
      const y3 = s.mul(x1.sub(x3)).sub(y1);
      y3.print()
      return this.new(x3, y3);
    }

    if (this.x.eq(other.x)) {
      return this.new();
    }

    const x2 = other.x as FiniteNum<T>;
    const y2 = other.y as FiniteNum<T>;

    // const s = (y2 - y1) / (x2 - x1)
    const s = y2.sub(y1).div(x2.sub(x1));
    s.print()
    // const x3 = s ** 2n - x1 - x2
    const x3 = s.pow(2n).sub(x1).sub(x2);
    x3.print()
    // const y3 = s * (x1 - x3) - y1
    const y3 = s.mul(x1.sub(x3)).sub(y1);
    y3.print()
    return this.new(x3, y3);
  };

  public rmul = (num: number | bigint) => {
    let n = num
    let res = this.copy()
    while (n > 1) {
      res = res.add(this) 
      n--
    }
    
    return res
  }

  public copy = () => {
    return new Point<T>(this.x, this.y, this.a, this.b)
  }

  public isOnTheCurve = () => {
    if (this.x == undefined || this.y == undefined) {
      return false;
    }

    // return this.y ** 2n == (this.x ** 3n + this.a * this.x + this.b);
    return this.y.pow(2n).eq(
      this.x.pow(3n).add(this.a.mul(this.x)).add(this.b),
    );
  };
}
