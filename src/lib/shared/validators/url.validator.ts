import z from 'zod';

/**
 * @group Enhancers
 * @category HttpStatus
 * @description Validates that a string is a proper URL.
 */
export const ValidURL = z.string().url();
