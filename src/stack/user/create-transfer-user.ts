import { TransferUser } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';
import type { TransferUserOptions } from './transfer-user-options';

/**
 * Creates a transfer user resource
 * @param scope Scope
 * @param options Transfer user options
 * @returns Transfer user resource
 */
export function createTransferUser(scope: Construct, options: TransferUserOptions): TransferUser {
  const { bucket, transferServer, transferUserRole, user } = options;
  return new TransferUser(scope, user.name, {
    serverId: transferServer.id,
    userName: user.name,
    role: transferUserRole.arn,

    homeDirectoryType: 'LOGICAL',
    homeDirectoryMappings: [
      {
        entry: '/',
        target: `/${bucket}/${user.homePath}`
      }
    ]
  });
}
