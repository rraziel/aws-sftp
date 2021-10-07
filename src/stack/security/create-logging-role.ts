import { IamRole, IamRolePolicy } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';
import { createLoggingPolicyDocument } from './create-logging-policy-document';
import type { LoggingRoleOptions } from './logging-role-options';

/**
 * Creates a logging role
 * @param scope Scope
 * @param options Logging role options
 * @returns Loggin IAM role
 */
export function createLoggingRole(scope: Construct, options: LoggingRoleOptions): IamRole {
  const { assumeRolePolicyDocument, name, region } = options;
  const loggingPolicyDocument = createLoggingPolicyDocument(scope, region);
  const role = new IamRole(scope, 'logging', {
    name,
    description: 'SFTP server logging role',
    assumeRolePolicy: assumeRolePolicyDocument.json
  });
  new IamRolePolicy(scope, 'logging_policy', {
    name,
    role: role.name,
    policy: loggingPolicyDocument.json
  });
  return role;
}
