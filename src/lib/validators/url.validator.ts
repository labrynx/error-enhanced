import z from 'zod';

/**
 * Validates that a string is a proper URL.
 */
export const ValidURL = z.string().url();
