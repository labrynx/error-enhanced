import z from 'zod';
import { Severity } from '../../components/identifiers';

/**
 * @group Enhancers
 * @category Identifiers
 * @description Validator for Severity Enum.
 */
export const ValidSeverity = z.nativeEnum(Severity);
