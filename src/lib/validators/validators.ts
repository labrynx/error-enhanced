/**
 * @file validators.ts
 *
 * This file contains various Zod validators for input validation.
 * These validators are mainly used in the setters within the classes
 * of the error handling system.
 *
 * @author Alessandro Barbagallo
 * @version 1.0.0
 */

import { z } from 'zod';

import { Category } from '../enums/category.enum';
import { SeverityLevel } from '../enums/severity.enum';
import { HttpMethods } from '../enums/http-methods.enum';
import { HttpStatusCodes } from '../enums/http-status-codes.enum';

// ============================================================================
// Enums Validators
// ============================================================================

/**
 * Validator for Category Enum.
 */
export const ValidCategory = z.nativeEnum(Category);

/**
 * Validator for SeverityLevel Enum.
 */
export const ValidSeverityLevel = z.nativeEnum(SeverityLevel);

/**
 * Validator for HttpMethods Enum.
 */
export const ValidHttpMethods = z.nativeEnum(HttpMethods);

/**
 * Validator for HttpStatusCodes Enum.
 */
export const ValidHttpStatusCodes = z.nativeEnum(HttpStatusCodes);

// ============================================================================
// Primitive Type Validators
// ============================================================================

/**
 * Validates that a string is not empty.
 */
export const ValidString = z.string().nonempty();

/**
 * Validates a string, allowing it to be empty.
 */
export const ValidStringWithEmpty = z.string();

/**
 * Validates that a number is an integer and greater than 0.
 */
export const ValidNumber = z.number().int().gt(0);

/**
 * Validates that a string is a proper URL.
 */
export const ValidURL = z.string().url();

/**
 * Validates that a string is a proper IP address.
 */
export const ValidIP = z.string().ip();

// ============================================================================
// Object Type Validators
// ============================================================================

/**
 * Validates that an object's keys are all non-empty strings.
 */
export const ValidKeyedObject = z
  .record(z.any())
  .refine(
    obj => Object.keys(obj).every(key => ValidString.safeParse(key).success),
    { message: 'All keys must be valid non-empty strings' },
  );
