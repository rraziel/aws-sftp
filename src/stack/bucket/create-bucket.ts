import { S3Bucket } from '@cdktf/provider-aws';
import { TerraformOutput } from 'cdktf';
import type { Construct } from 'constructs';
import type { BucketOptions } from './bucket-options';

/**
 * Creates an S3 bucket resource
 * @param scope Scope
 * @param options Bucket options
 * @returns S3 bucket
 */
export function createBucket(scope: Construct, options: BucketOptions): S3Bucket {
  const { bucket } = options;
  const s3Bucket = new S3Bucket(scope, 's3bucket', {
    acl: 'private',
    bucket,
    lifecycle: { preventDestroy: false }
  });
  new TerraformOutput(scope, 'bucket', {
    description: 'Bucket',
    value: {
      arn: s3Bucket.arn,
      domain: s3Bucket.bucketDomainName
    }
  });
  return s3Bucket;
}
