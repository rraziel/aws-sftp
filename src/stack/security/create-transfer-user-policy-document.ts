import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';

/**
 * Creates an IAM policy document describing the services and resources used by the transfer user role
 * @param scope Scope
 * @param bucket Bucket name
 * @returns IAM policy document
 */
export function createTransferUserPolicyDocument(scope: Construct, bucket: string): DataAwsIamPolicyDocument {
  return new DataAwsIamPolicyDocument(scope, 'transfer_user_policy_document', {
    statement: [
      {
        actions: ['s3:ListBucket'],
        resources: [`arn:aws:s3:::${bucket}`]
      },
      {
        actions: [
          's3:PutObject',
          's3:GetObject',
          's3:DeleteObject'
          // NOTE: only needed for cross-account access
          //'s3:GetObjectACL',
          //'s3:PutObjectACL'
        ],
        resources: [`arn:aws:s3:::${bucket}/*`]
      }
    ]
  });
}
