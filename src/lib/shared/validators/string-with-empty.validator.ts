import z from 'zod';

/**
 * @group Enhancers
 * @category Identifiers
 * @description Validates a string, allowing it to be empty.
 */
export const ValidStringWithEmpty = z.string();
