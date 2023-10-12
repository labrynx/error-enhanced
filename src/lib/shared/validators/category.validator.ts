import z from 'zod';
import { Category } from '../../components/identifiers';

/**
 * @group Enhancers
 * @category Identifiers
 * @description Validator for Category Enum.
 */
export const ValidCategory = z.nativeEnum(Category);
