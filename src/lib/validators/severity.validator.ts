import z from 'zod';
import { SeverityLevel } from '../enums';

/**
 * Validator for SeverityLevel Enum.
 */
export const ValidSeverityLevel = z.nativeEnum(SeverityLevel);
