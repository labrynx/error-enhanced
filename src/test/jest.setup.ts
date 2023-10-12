// Globals

/**
 * Extending the BigInt prototype to include a toJSON method.
 * This is necessary because Jest doesn't know how to handle BigInt during JSON serialization,
 * which is often required when you do something like JSON.stringify in your tests.
 * By adding this method, we ensure that BigInt can be serialized to a string,
 * allowing Jest to handle it without issues.
 */

// eslint-disable-next-line @typescript-eslint/no-redeclare, @typescript-eslint/no-unused-vars
interface BigInt {
  /** Convert BigInt to string form in JSON.stringify */
  toJSON: () => string;
}
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
