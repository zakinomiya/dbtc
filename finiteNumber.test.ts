import {
  assert,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { FiniteNum } from "./finiteNumber.ts";

Deno.test({
  name: "FiniteNum#1 Throw error on num >= prime",
  fn: () => {
    assertThrows(() => new FiniteNum(5, 0));
  },
});

Deno.test({
  name: "FiniteNum#2 Throw error on nun < 0",
  fn: () => {
    assertThrows(() => new FiniteNum(-5, 10));
  },
});

Deno.test({
  name: "FiniteNum#3 Successfully initialise the instance",
  fn: () => {
    new FiniteNum(5, 8);
  },
});

Deno.test({
  name: "FiniteNum#4 eq function",
  fn: () => {
    const fe1 = new FiniteNum(5, 8);
    const fe2 = new FiniteNum(5, 8);
    assert(fe1.eq(fe2));

    const fe3 = new FiniteNum(5, 8);
    const fe4 = new FiniteNum(4, 8);
    assert(!fe3.eq(fe4));
  },
});

Deno.test({
  name: "FiniteNum#5 add function",
  fn: () => {
    const fe1 = new FiniteNum(1, 5);
    const fe2 = new FiniteNum(4, 7);
    assertThrows(() => fe1.add(fe2));

    const v: { [key: string]: number[] } = {
      // case: [prime, num1, num2, res]
      c1: [8, 2, 5, 7],
      c2: [100, 90, 57, 47],
      c3: [57, 10, 48, 1],
      c4: [19, 12, 7, 0],
    };

    for (const c in v) {
      const p = v[c][0];
      const n1 = v[c][1];
      const n2 = v[c][2];
      const r = v[c][3];

      assert(
        new FiniteNum(r, p).eq(
          new FiniteNum(n1, p).add(new FiniteNum(n2, p)),
        ),
      );
    }
  },
});

Deno.test({
  name: "FiniteNum#6 sub function",
  fn: () => {
    const v: { [key: string]: number[] } = {
      // case: [prime, num1, num2, res]
      c1: [8, 2, 5, 5],
      c2: [100, 90, 57, 33],
      c3: [57, 10, 48, 19],
      c4: [19, 12, 18, 13],
    };

    for (const c in v) {
      const p = v[c][0];
      const n1 = v[c][1];
      const n2 = v[c][2];
      const r = v[c][3];

      assert(
        new FiniteNum(r, p).eq(
          new FiniteNum(n1, p).sub(new FiniteNum(n2, p)),
        ),
      );
    }
  },
});

Deno.test({
  name: "FiniteNum#7 mul function",
  fn: () => {
    const v: { [key: string]: number[] } = {
      // case: [prime, num, exp, res]
      c1: [8, 7, 7, 1],
      c2: [100, 13, 8, 4],
      c3: [57, 4, 4, 16],
      c4: [19, 10, 4, 2],
    };

    for (const c in v) {
      const p = v[c][0];
      const n1 = v[c][1];
      const n2 = v[c][2];
      const r = v[c][3];

      assert(
        new FiniteNum(r, p).eq(
          new FiniteNum(n1, p).mul(new FiniteNum(n2, p)),
        ),
      );
    }
  },
});

Deno.test({
  name: "FiniteNum#8 pow function",
  fn: () => {
    const v: { [key: string]: number[] } = {
      // case: [prime, num, exp, res]
      c1: [8, 2, 3, 0],
      c2: [100, 13, 2, 69],
      c3: [57, 4, 4, 28],
      c4: [19, 10, 4, 6],
      c5: [31, 17, -3, 29],
    };

    for (const c in v) {
      const p = v[c][0];
      const n1 = v[c][1];
      const e = v[c][2];
      const r = v[c][3];

      assert(new FiniteNum(r, p).eq(new FiniteNum(n1, p).pow(e)));
    }
  },
});

Deno.test({
  name: "FiniteNum#9 div function",
  fn: () => {
    const v: { [key: string]: number[] } = {
      // case: [prime, num1, num2, res]
      c1: [19, 2, 7, 3],
      c2: [19, 7, 5, 9],
    };

    for (const c in v) {
      const p = v[c][0];
      const n1 = v[c][1];
      const n2 = v[c][2];
      const r = v[c][3];

      assert(
        new FiniteNum(r, p).eq(
          new FiniteNum(n1, p).div(new FiniteNum(n2, p)),
        ),
      );
    }
  },
});
