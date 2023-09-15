import { ValidString } from '../../validators/validators';

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
export class UserInfoEnhancer {
  private _user: string = 'unkown'; // User ID or username related to the error
  private _sessionId: string = 'unkown'; // User session ID
  private _roles: string[] = []; // User roles or permissions
  private _authToken: string = 'unkown'; // Authentication token
  private _ipAddress: string = 'unkown'; // IP Address
  private _userAgent: string = 'unkown'; // Browser and OS details
  private _actionHistory: string[] = []; // Previous user actions

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

  public get actionHistory(): string[] {
    return this._actionHistory;
  }
}
