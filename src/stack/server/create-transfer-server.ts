import { TransferServer } from '@cdktf/provider-aws';
import { TerraformOutput } from 'cdktf';
import type { Construct } from 'constructs';
import type { TransferServerOptions } from './transfer-server-options';

/**
 * Creates a transfer server
 * @param scope Scope
 * @param options Transfer server options
 * @returns Transfer server
 */
export function createTransferServer(scope: Construct, options: TransferServerOptions): TransferServer {
  const { loggingRole } = options;
  const transferServer = new TransferServer(scope, 'server', {
    endpointType: 'PUBLIC',
    identityProviderType: 'SERVICE_MANAGED',
    loggingRole: loggingRole.arn
  });
  new TerraformOutput(scope, 'ftp', {
    description: 'FTP server endpoint',
    value: {
      endpoint: transferServer.endpoint,
      fingerprint: transferServer.hostKeyFingerprint,
      logs: `/aws/transfer/${transferServer.id}`,
      protocols: transferServer.protocols
    }
  });
  return transferServer;
}
