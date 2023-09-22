import z from 'zod';
import { SeverityLevel } from '../components/identifiers';

/**
 * Validator for SeverityLevel Enum.
 */
export const ValidSeverityLevel = z.nativeEnum(SeverityLevel);
