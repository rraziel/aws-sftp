import { IamRole, IamRolePolicy } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';
import { createTransferUserPolicyDocument } from './create-transfer-user-policy-document';
import type { TransferUserRoleOptions } from './transfer-user-role-options';

/**
 * Creates an IAM role for transfer users
 * @param scope Scope
 * @param options Transfer user role options
 * @returns IAM role
 */
export function createTransferUserRole(scope: Construct, options: TransferUserRoleOptions): IamRole {
  const { assumeRolePolicyDocument, bucket, name } = options;
  const transferUserPolicyDocument = createTransferUserPolicyDocument(scope, bucket);
  const role = new IamRole(scope, 'transfer_user', {
    name,
    description: 'SFTP server user role',
    assumeRolePolicy: assumeRolePolicyDocument.json
  });
  new IamRolePolicy(scope, 'transfer_policy', {
    name,
    role: role.name,
    policy: transferUserPolicyDocument.json
  });
  return role;
}
