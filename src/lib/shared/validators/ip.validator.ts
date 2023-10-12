import z from 'zod';

/**
 * @group Enhancers
 * @category HttpStatus
 * @description Validates that a string is a proper IP address.
 */
export const ValidIP = z.string().ip();
