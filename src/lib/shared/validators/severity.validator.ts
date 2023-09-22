import z from 'zod';
import { Severity } from '../../components/identifiers';

/**
 * Validator for Severity Enum.
 */
export const ValidSeverity = z.nativeEnum(Severity);
