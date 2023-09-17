import z from 'zod';
import { HttpMethods } from '../enums';

/**
 * Validator for HttpMethods Enum.
 */
export const ValidHttpMethods = z.nativeEnum(HttpMethods);
