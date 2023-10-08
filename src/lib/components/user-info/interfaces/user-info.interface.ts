/**
 * @interface UserInfoInterface
 *
 * The UserInfo interface defines the contract for classes that enrich
 * error objects with user-related information. This includes the
 * user ID, session ID, roles, authentication tokens, IP address, etc.
 *
 * @property {string} sessionId
 * Read-only property that returns the session ID of the user related to the error.
 *
 * @property {string[]} roles
 * Read-only property that returns the roles or permissions of the user related to the error.
 *
 * @property {string} authToken
 * Read-only property that returns the authentication token of the user related to the error.
 *
 * @property {string} ipAddress
 * Read-only property that returns the IP address of the user related to the error.
 *
 * @property {string} userAgent
 * Read-only property that returns the user-agent string of the user related to the error.
 *
 * @property {string[]} actionHistory
 * Read-only property that returns the action history of the user related to the error.
 *
 * @method setUser(user: string): this
 * Sets the user ID or username related to the error. Should throw an error if the user string is invalid.
 *
 * @method setSessionId(sessionId: string): this
 * Sets the session ID of the user related to the error. Should throw an error if the session ID string is invalid.
 *
 * @method setRoles(roles: string[]): this
 * Sets the roles or permissions of the user related to the error.
 *
 * @method setAuthToken(token: string): this
 * Sets the authentication token of the user related to the error. Should throw an error if the authentication token is invalid.
 *
 * @method setIpAddress(ip: string): this
 * Sets the IP address of the user related to the error. Should throw an error if the IP address is invalid.
 *
 * @method setUserAgent(userAgent: string): this
 * Sets the user-agent string of the user related to the error. Should throw an error if the user-agent string is invalid.
 *
 * @method addActionToHistory(action: string): this
 * Adds an action to the action history of the user related to the error. Should throw an error if the action string is invalid.
 */
export interface UserInfoInterface {
  readonly user: string;
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
