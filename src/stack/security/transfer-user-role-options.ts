import type { DataAwsIamPolicyDocument } from '@cdktf/provider-aws';

/**
 * Transfer user role options
 */
export interface TransferUserRoleOptions {
  readonly assumeRolePolicyDocument: DataAwsIamPolicyDocument;
  readonly bucket: string;
  readonly name: string;
}
