import z from 'zod';

/**
 * @group Enhancers
 * @category ApplicationState
 * @category UserInfo
 * @category Identifiers
 * @description Validates that a string is not empty.
 */
export const ValidString = z
  .string()
  .refine(str => typeof str === 'string' && str.trim().length > 0, {
    message: 'String must not be empty',
  });
