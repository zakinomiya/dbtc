import {
  assert,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Point } from "./_rnPoint.ts";

Deno.test({
  name: "Point#1 invalid point",
  fn: () => {
    assertThrows(() => new Point(-2, -1, 5, 7));
  },
});

Deno.test({
  name: "Point#2 eq function",
  fn: () => {
    const p1 = new Point(-1, -1, 5, 7);
    const p2 = new Point(-1, -1, 5, 7);
    const p3 = new Point(18, 77, 5, 7);

    assert(p1.eq(p2));
    assert(!p1.eq(p3));
  },
});

Deno.test({
  name: "Point#3 add function",
  fn: () => {
    const [a, b] = [5, 7]
    const inf = new Point(undefined, undefined, a, b);
    const p1 = new Point(-1, -1, a, b);
    const p2 = new Point(2, 5, a, b);
    const p3 = new Point(3, -7, a,b);

    assert(p1.eq(p1.add(inf)))
    assert(p1.eq(inf.add(p1)))
    assert(p3.eq(p1.add(p2)));
  },
});