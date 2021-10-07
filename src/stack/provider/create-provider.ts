import { AwsProvider } from '@cdktf/provider-aws';
import type { Construct } from 'constructs';
import type { ProviderOptions } from './provider-options';

/**
 * Creates an AWS provider
 * @param scope Scope
 * @param options Provider options
 * @returns AWS provider
 */
export function createProvider(scope: Construct, options: ProviderOptions): AwsProvider {
  const { profile, region, tags } = options;
  return new AwsProvider(scope, 'aws', {
    region,
    profile,
    defaultTags: [{ tags }]
  });
}
