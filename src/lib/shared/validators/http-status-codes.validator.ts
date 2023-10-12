import z from 'zod';

import { HttpStatusCodes } from '../../components/http-status';

/**
 * @group Enhancers
 * @category HttpStatus
 * @description Validator for HttpStatusCodes Enum.
 */
export const ValidHttpStatusCodes = z.nativeEnum(HttpStatusCodes);
