import type { TransferServer } from '@cdktf/provider-aws';

/**
 * DNS record options
 */
export interface DnsRecordOptions {
  /**
   * Domain name
   */
  readonly name: string;
  /**
   * Transfer server
   */
  readonly transferServer: TransferServer;
  /**
   * Zone name
   */
  readonly zoneName: string;
}
