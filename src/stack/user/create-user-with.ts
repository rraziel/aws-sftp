import type { Construct } from 'constructs';
import type { User } from '../../user/user';
import { createTransferSshKey } from './create-transfer-ssh-key';
import { createTransferUser } from './create-transfer-user';
import type { TransferUserOptions } from './transfer-user-options';

/**
 * Returns a function that creates a transfer user and a transfer SSH key for the user
 * @param scope Scope
 * @param options Transfer user options
 * @returns Function that creates a transfer user and a transfer SSH key for the user
 */
export function createUserWith(scope: Construct, options: Omit<TransferUserOptions, 'user'>): (user: User) => void {
  return user => {
    const transferUser = createTransferUser(scope, {
      ...options,
      user
    });
    createTransferSshKey(scope, {
      transferServer: options.transferServer,
      transferUser,
      user
    });
  };
}
