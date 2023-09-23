import z from 'zod';

/**
 * Validates that a string is not empty.
 */
export const ValidString = z.string().nonempty();
