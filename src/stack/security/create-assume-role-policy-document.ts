import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';

/**
 * Creates an IAM policy document describing the service the logging role will assume
 * @param scope Scope
 * @returns IAM policy document
 */
export function createAssumeRolePolicyDocument(scope: Construct): DataAwsIamPolicyDocument {
  return new DataAwsIamPolicyDocument(scope, 'assume_role_transfer', {
    statement: [
      {
        actions: ['sts:AssumeRole'],
        principals: [
          {
            type: 'Service',
            identifiers: ['transfer.amazonaws.com']
          }
        ]
      }
    ]
  });
}
