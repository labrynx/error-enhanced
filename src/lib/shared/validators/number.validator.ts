import z from 'zod';

/**
 * @group Enhancers
 * @category HttpStatus
 * @category Identifiers
 * @description Validates that a number is an integer and greater than 0.
 */
export const ValidNumber = z.number().int().gt(0);
