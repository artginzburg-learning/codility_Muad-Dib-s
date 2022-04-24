import test from 'ava';

import { findLowestTotalPrice } from '.';

test('first', t => {
  const days = [1, 30];
  const lowestTotalPrice = findLowestTotalPrice(days);
  t.is(lowestTotalPrice, 4);
});

test('second', t => {
  const days = [1, 2, 3, 4, 5, 15, 29, 30, 90];
  const lowestTotalPrice = findLowestTotalPrice(days);
  // should cover the first five days with a 7-day ticket, and the other days with 4 1-day tickets, returning 7*1 + 2*4
  t.is(lowestTotalPrice, 15);
});
