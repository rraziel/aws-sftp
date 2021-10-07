import { DataAwsCallerIdentity, DataAwsIamPolicyDocument } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';

/**
 * Creates an IAM policy document describing the services and resources used by the logging role
 * @param scope Scope
 * @param region AWS region
 * @returns IAM policy document
 */
export function createLoggingPolicyDocument(
  scope: Construct,
  region: string
): DataAwsIamPolicyDocument {
  const account = new DataAwsCallerIdentity(scope, 'current_account_for_logging_policy');
  return new DataAwsIamPolicyDocument(scope, 'logging_policy_document', {
    statement: [
      {
        actions: ['logs:DescribeLogStreams', 'logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: [`arn:aws:logs:${region}:${account.accountId}:*`]
      }
    ]
  });
}
