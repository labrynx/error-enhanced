import z from 'zod';
import { Category } from '../../components/identifiers';

/**
 * Validator for Category Enum.
 */
export const ValidCategory = z.nativeEnum(Category);
