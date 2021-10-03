/**
 * Converts pixel size to rem and accepts the base as second argument. default base is 16px
 *
 */
export default function remCalc(px = 16, base = 16): string {
  return (1 / base) * px + 'rem';
}
