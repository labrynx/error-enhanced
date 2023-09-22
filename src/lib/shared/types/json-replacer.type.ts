/**
 * @typedef JsonReplacer
 *
 * A type representing a function that takes a key and value as arguments,
 * and returns a value. Typically used for customizing JSON stringification.
 *
 * @param {string} key - The key in the JSON object.
 * @param {any} value - The corresponding value.
 *
 * @returns {any} The new or modified value.
 */
export type JsonReplacer = (key: string, value: any) => any;
