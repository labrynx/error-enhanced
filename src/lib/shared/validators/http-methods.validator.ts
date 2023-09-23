import z from 'zod';

import { HttpMethods } from '../../components/http-status';

/**
 * Validator for HttpMethods Enum.
 */
export const ValidHttpMethods = z.nativeEnum(HttpMethods);
