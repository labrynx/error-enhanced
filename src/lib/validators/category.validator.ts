import z from 'zod';
import { Category } from '../enums';

/**
 * Validator for Category Enum.
 */
export const ValidCategory = z.nativeEnum(Category);
