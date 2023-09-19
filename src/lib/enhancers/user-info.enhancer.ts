import { ValidString } from '../validators';
import { UserInfo } from '../interfaces';

/**
 * @class UserInfoEnhancer
 *
 * The UserInfoEnhancer class enriches the error object with user-related information.
 * This includes the user ID, session ID, roles, authentication tokens, etc.
 *
 * @example
 * const errorInfo = new UserInfoEnhancer();
 * errorInfo.setUser("JohnDoe").setRoles(["admin", "user"]);
 */
export class UserInfoEnhancer implements UserInfo {
  /**
   * @private
   * @type {string}
   * User ID or username related to the error.
   */
  private _user: string = '';

  /**
   * @private
   * @type {string}
   * User session ID.
   */
  private _sessionId: string = '';

  /**
   * @private
   * @type {string[]}
   * User roles or permissions.
   */
  private _roles: string[] = [];

  /**
   * @private
   * @type {string}
   * Authentication token.
   */
  private _authToken: string = '';

  /**
   * @private
   * @type {string}
   * IP Address.
   */
  private _ipAddress: string = '';

  /**
   * @private
   * @type {string}
   * Browser and OS details.
   */
  private _userAgent: string = '';

  /**
   * @private
   * @type {string[]}
   * Previous user actions.
   */
  private _actionHistory: string[] = [];

  /**
   * @constructor
   *
   * Constructs a new UserInfoEnhancer object and initializes all the fields to 'unknown' or empty arrays.
   */
  constructor() {}

  // ====================================================================
  // Getters & Setters
  // ====================================================================

  /**
   * setUser
   *
   * Sets the user ID or username related to the error.
   *
   * @param user - The user ID or username
   * @throws Will throw an error if the user string is invalid.
   */
  public setUser(user: string): this {
    const parsed = ValidString.safeParse(user);
    if (!parsed.success) {
      throw new Error('Invalid user');
    }
    this._user = user;
    return this;
  }

  /**
   * setSessionId
   *
   * Sets the session ID related to the error.
   *
   * @param sessionId - The user session ID
   * @throws Will throw an error if the session ID string is invalid.
   */
  public setSessionId(sessionId: string): this {
    const parsed = ValidString.safeParse(sessionId);
    if (!parsed.success) {
      throw new Error('Invalid sessionId');
    }
    this._sessionId = sessionId;
    return this;
  }

  /**
   * @public
   * @method sessionId
   * @returns {string} The current session ID related to the error.
   *
   * Getter method for retrieving the session ID associated with the error.
   */
  public get sessionId(): string {
    return this._sessionId;
  }

  /**
   * setRoles
   *
   * Sets the roles or permissions related to the error.
   *
   * @param roles - An array of roles or permissions
   */
  public setRoles(roles: string[]): this {
    this._roles = roles;
    return this;
  }

  /**
   * @public
   * @method roles
   * @returns {string[]} The current roles or permissions related to the error.
   *
   * Getter method for retrieving the roles or permissions associated with the error.
   */
  public get roles(): string[] {
    return this._roles;
  }

  /**
   * setAuthToken
   *
   * Sets the authentication token related to the error.
   *
   * @param token - The authentication token
   * @throws Will throw an error if the authentication token is invalid.
   */
  public setAuthToken(token: string): this {
    const parsed = ValidString.safeParse(token);
    if (!parsed.success) {
      throw new Error('Invalid authentication token');
    }
    this._authToken = token;
    return this;
  }

  /**
   * @public
   * @method authToken
   * @returns {string} The current authentication token related to the error.
   *
   * Getter method for retrieving the authentication token associated with the error.
   */
  public get authToken(): string {
    return this._authToken;
  }

  /**
   * setIpAddress
   *
   * Sets the IP address related to the error.
   *
   * @param ip - The IP address
   * @throws Will throw an error if the IP address is invalid.
   */
  public setIpAddress(ip: string): this {
    const parsed = ValidString.safeParse(ip);
    if (!parsed.success) {
      throw new Error('Invalid IP address');
    }
    this._ipAddress = ip;
    return this;
  }

  /**
   * @public
   * @method ipAddress
   * @returns {string} The current IP address related to the error.
   *
   * Getter method for retrieving the IP address associated with the error.
   */
  public get ipAddress(): string {
    return this._ipAddress;
  }

  /**
   * setUserAgent
   *
   * Sets the user agent related to the error.
   *
   * @param userAgent - The user agent string
   * @throws Will throw an error if the user agent string is invalid.
   */
  public setUserAgent(userAgent: string): this {
    const parsed = ValidString.safeParse(userAgent);
    if (!parsed.success) {
      throw new Error('Invalid user agent');
    }
    this._userAgent = userAgent;
    return this;
  }

  /**
   * @public
   * @method userAgent
   * @returns {string} The current user agent string related to the error.
   *
   * Getter method for retrieving the user agent string associated with the error.
   */
  public get userAgent(): string {
    return this._userAgent;
  }

  /**
   * addActionToHistory
   *
   * Adds an action to the action history related to the error.
   *
   * @param action - The action to add to the history
   * @throws Will throw an error if the action string is invalid.
   */
  public addActionToHistory(action: string): this {
    const parsed = ValidString.safeParse(action);
    if (!parsed.success) {
      throw new Error('Invalid action');
    }
    this._actionHistory.push(action);
    return this;
  }

  /**
   * @public
   * @method actionHistory
   * @returns {string[]} The action history related to the error.
   *
   * Getter method for retrieving the action history associated with the error.
   */
  public get actionHistory(): string[] {
    return this._actionHistory;
  }
}
