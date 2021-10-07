/**
 * User
 */
export interface User {
  /**
   * Home path on the S3 bucket
   */
  readonly homePath: string;
  /**
   * Key used to access the FTP server
   */
  readonly key: string;
  /**
   * User name
   */
  readonly name: string;
}
