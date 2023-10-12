/**
 * @enum Severity
 * @group Enhancers
 * @category Identifiers
 *
 * @example
 * ```typescript
 * const sev = Severity.HIGH;
 * ```
 *
 * [[include:enums/severity.md]]
 */
export enum Severity {
  /**
   * @description Indicates a low-impact error that generally doesn't affect the system's overall functionality.
   * @usecase Minor UI glitches, log-only issues, non-critical background task failures.
   */
  LOW = 'low',

  /**
   * @description Indicates a moderate-impact error that may affect some minor functionalities.
   * @usecase Invalid user input, API rate-limiting, partial feature malfunction.
   */
  MEDIUM = 'medium',

  /**
   * @description Indicates a high-impact error that affects critical functionalities but doesn't halt the entire system.
   * @usecase Database access issues, missing critical resources, broken authentication.
   */
  HIGH = 'high',

  /**
   * @description Indicates a critical-impact error that demands immediate attention, potentially causing system outage.
   * @usecase Server crashes, data corruption, security breaches.
   */
  CRITICAL = 'critical',
}
