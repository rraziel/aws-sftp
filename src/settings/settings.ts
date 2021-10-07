/**
 * Settings
 */
export interface Settings {
  /**
   * Bucket name
   */
  readonly bucket: string;
  /**
   * AWS region
   */
  readonly region: string;
  /**
   * Profile
   */
  readonly profile: string;
  /**
   * Roles
   */
   readonly roles: {
    /**
     * Logging role name
     */
    readonly logging: string;
    /**
     * Transfer server user role name
     */
    readonly user: string;
  };
  /**
   * Domain
   */
  readonly domain?: {
    /**
     * Domain name
     */
    readonly name: string;
    /**
     * Domain zone name
     */
    readonly zone: string;
  };
  /**
   * Tags
   */
  readonly tags: Record<string, string>;
  /**
   * User settings
   */
  readonly users: {
    /**
     * Path to the key files
     */
    readonly keysPath: string;
    /**
     * List of user names
     */
    readonly userNames: ReadonlyArray<string>;
  }
}
