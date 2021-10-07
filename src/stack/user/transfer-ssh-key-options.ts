import type { TransferServer, TransferUser } from '@cdktf/provider-aws';
import type { User } from '../../user/user';

/**
 * Transfer SSH key options
 */
export interface TransferSshKeyOptions {
  /**
   * Transfer server resource
   */
  readonly transferServer: TransferServer;
  /**
   * Transfer user resource
   */
  readonly transferUser: TransferUser;
  /**
   * User
   */
  readonly user: User;
}
