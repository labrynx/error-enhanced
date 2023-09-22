import z from 'zod';

import { HttpStatusCodes } from '../../components/http-status';

/**
 * Validator for HttpStatusCodes Enum.
 */
export const ValidHttpStatusCodes = z.nativeEnum(HttpStatusCodes);
