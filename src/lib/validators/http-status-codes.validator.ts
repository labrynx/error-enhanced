import z from 'zod';
import { HttpStatusCodes } from '../enums';

/**
 * Validator for HttpStatusCodes Enum.
 */
export const ValidHttpStatusCodes = z.nativeEnum(HttpStatusCodes);
