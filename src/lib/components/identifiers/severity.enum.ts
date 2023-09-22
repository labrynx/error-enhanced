/**
 * Enum to represent the severity level of an error.
 */
export enum SeverityLevel {
  /**
   * Indicates a low-impact error that generally doesn't affect the system's functionality.
   */
  LOW = 'low',

  /**
   * Indicates a moderate-impact error that may affect some minor functionalities.
   */
  MEDIUM = 'medium',

  /**
   * Indicates a high-impact error that affects critical functionalities but doesn't halt the entire system.
   */
  HIGH = 'high',

  /**
   * Indicates a critical-impact error that demands immediate attention, potentially causing system outage.
   */
  CRITICAL = 'critical',
}
