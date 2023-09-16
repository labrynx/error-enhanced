export interface Identifiers {
  readonly id: string;
  readonly errorCode: string;
  readonly errorCodePrefix: string;
  readonly errorDescription: string;
  readonly timestamp: number;
  readonly severity: string;
  readonly category: string;

  setErrorCode(errorCode: number): this;
  setErrorCodePrefix(errorCodePrefix: string): this;
  setErrorDescription(errorDescription: string): this;
  getHash(): string;
  setSeverity(severity: string): this;
  setCategory(category: string): this;
}
