import type { DataAwsIamPolicyDocument } from '@cdktf/provider-aws';

/**
 * Logging role options
 */
export interface LoggingRoleOptions {
  readonly assumeRolePolicyDocument: DataAwsIamPolicyDocument;
  readonly name: string;
  readonly region: string;
}
