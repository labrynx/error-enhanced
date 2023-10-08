import z from 'zod';

/**
 * Validates if a string is non-empty.
 */
const isValidKey = (key: string): boolean => {
  return typeof key === 'string' && key.trim().length > 0;
};

/**
 * Validates that an object's keys are all non-empty strings.
 */
export const ValidKeyedObject = z.record(z.any()).refine(
  obj => {
    for (const key of Object.keys(obj)) {
      if (!isValidKey(key)) {
        return false;
      }
    }
    return true;
  },
  { message: 'All keys must be valid non-empty strings' },
);
