/**
 * @file Some common utilities.
 */

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export const tap = (fn) => (d) => {
  fn(d);
  return d;
};
