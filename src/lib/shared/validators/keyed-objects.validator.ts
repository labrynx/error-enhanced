import z from 'zod';

import { ValidString } from './string.validator';

/**
 * Validates that an object's keys are all non-empty strings.
 */
export const ValidKeyedObject = z
  .record(z.any())
  .refine(
    obj => Object.keys(obj).every(key => ValidString.safeParse(key).success),
    { message: 'All keys must be valid non-empty strings' },
  );
