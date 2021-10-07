import { TransferSshKey } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';
import { TransferSshKeyOptions } from './transfer-ssh-key-options';

/**
 * Creates a transfer SSH key resource
 * @param scope Scope
 * @param options Transfer SSH key options
 * @returns Transfer SSH key resource
 */
export function createTransferSshKey(scope: Construct, options: TransferSshKeyOptions): TransferSshKey {
  const { user, transferServer, transferUser } = options;
  return new TransferSshKey(scope, `${user.name}_ssh`, {
    body: user.key,
    serverId: transferServer.id,
    userName: transferUser.userName
  });
}
