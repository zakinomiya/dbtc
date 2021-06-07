import { Point } from "./point.ts";
import { FiniteNum } from "./finiteNumber.ts";
import { ntob } from "./utils.ts";

const prime = BigInt(2 ** 256 - 2 ** 32 - 977);
const A = 0;
const B = 7;
const N = BigInt(
  0xFFFFFFFF_FFFFFFFF_FFFFFFFF_FFFFFFFE_BAAEDCE6_AF48A03B_BFD25E8C_D0364141,
);

export class S256Field extends FiniteNum<S256Field> {
  constructor(num: number | bigint) {
    super(num, prime);
  }
}

export class S256Point extends Point<S256Field> {
  constructor(x: FiniteNum, y: FiniteNum) {
    super(x, y, new S256Field(A), new S256Field(B));
  }

  public rmul = (num: number | bigint) => {
    return super.rmul(ntob(num) % N);
  };

  public verify = (z: S256Field, sig: Signature) => {
    const sInverse = sig.s.pow(N - 2n);
    const u = z.mul(sInverse);
    const v = sig.r.mul(sInverse);
  };
}

export class Signature {
  constructor(
    public r: S256Field,
    public s: S256Field,
  ) {}
}

const Ga = new S256Field(
  0x79BE667E_F9DCBBAC_55A06295_CE870B07_029BFCDB_2DCE28D9_59F2815B_16F81798,
);
const Gb = new S256Field(
  0x483ADA77_26A3C465_5DA4FBFC_0E1108A8_FD17B448_A6855419_9C47D08F_FB10D4B8,
);

const G = new S256Point(Ga, Gb);
