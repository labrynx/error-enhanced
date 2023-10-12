import z from 'zod';

import { HttpMethods } from '../../components/http-status';

/**
 * @group Ehancers
 * @category HttpStatus
 * @description Validator for HttpMethods Enum.
 */
export const ValidHttpMethods = z.nativeEnum(HttpMethods);
