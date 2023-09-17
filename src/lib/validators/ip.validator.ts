import z from 'zod';

/**
 * Validates that a string is a proper IP address.
 */
export const ValidIP = z.string().ip();
