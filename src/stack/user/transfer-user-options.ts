import type { IamRole, TransferServer } from '@cdktf/provider-aws';
import type { User } from '../../user/user';

/**
 * Transfer user options
 */
export interface TransferUserOptions {
  /**
   * Bucket name
   */
  readonly bucket: string;
  /**
   * Transfer server
   */
  readonly transferServer: TransferServer;
  /**
   * Transfer user role
   */
  readonly transferUserRole: IamRole;
  /**
   * User
   */
  readonly user: User;
}
