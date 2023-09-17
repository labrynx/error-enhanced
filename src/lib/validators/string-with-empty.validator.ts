import z from 'zod';

/**
 * Validates a string, allowing it to be empty.
 */
export const ValidStringWithEmpty = z.string();
