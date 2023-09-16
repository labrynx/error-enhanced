export interface UserInfo {
  readonly sessionId: string;
  readonly roles: string[];
  readonly authToken: string;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly actionHistory: string[];

  setUser(user: string): this;
  setSessionId(sessionId: string): this;
  setRoles(roles: string[]): this;
  setAuthToken(token: string): this;
  setIpAddress(ip: string): this;
  setUserAgent(userAgent: string): this;
  addActionToHistory(action: string): this;
}
