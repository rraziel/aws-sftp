import type { IamRole } from '@cdktf/provider-aws';

/**
 * Transfer server options
 */
export interface TransferServerOptions {
  /**
   * IAM role for logging
   */
  readonly loggingRole: IamRole;
}
