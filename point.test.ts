import {
  assert,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Point, pointFactory } from "./point.ts";
import { FiniteNum, fnFactory } from "./finiteNumber.ts";

Deno.test({
  name: "Point#1 test over finite number",
  fn: () => {
    const f223 = fnFactory(223);
    const pA0B7 = pointFactory(f223(0), f223(7));

    const p1 = pA0B7(f223(170), f223(142));
    const p2 = pA0B7(f223(60), f223(139));
    const p3 = pA0B7(f223(220), f223(181));
    assert(p3.eq(p1.add(p2)));

    const p4 = pA0B7(f223(47), f223(71));
    const p5 = pA0B7(f223(17), f223(56));
    const p6 = pA0B7(f223(215), f223(68));
    assert(p6.eq(p4.add(p5)));

    const p7 = pA0B7(f223(143), f223(98));
    const p8 = pA0B7(f223(76), f223(66));
   const p9 = pA0B7(f223(47), f223(71));
    assert(p9.eq(p7.add(p8)));
  },
});

Deno.test({
  name: "Point#2 rmul function",
  fn: () => {
    const f223 = fnFactory(223);
    const pA0B7 = pointFactory(f223(0), f223(7));

    const p1 = pA0B7(f223(192), f223(105));
    const c1 = 2
    const p2 = pA0B7(f223(49), f223(71));
    assert(p2.eq(p1.rmul(c1)));

    const p3 = pA0B7(f223(47), f223(71));
    const c2 = 8
    const p4 = pA0B7(f223(116), f223(55));
    assert(p4.eq(p3.rmul(c2)));
    
    const p5 = pA0B7(f223(47), f223(71));
    const c3 = 21
    const p6 = pA0B7();
    assert(p6.eq(p5.rmul(c3)));
  },
});
