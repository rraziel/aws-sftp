import { DataAwsRoute53Zone, Route53Record } from '@cdktf/provider-aws';
import { TerraformOutput } from 'cdktf';
import type { Construct } from 'constructs';
import type { DnsRecordOptions } from './dns-record-options';

/**
 * Creates a DNS record
 * @param scope Scope
 * @param name Domain name
 * @param options DNS record options
 * @returns Route53 record
 */
export function createDnsRecord(scope: Construct, options: DnsRecordOptions): Route53Record {
  const { name, transferServer, zoneName } = options;
  const zone = new DataAwsRoute53Zone(scope, 'zone', {
    name: zoneName
  });
  const record = new Route53Record(scope, 'domain_record', {
    zoneId: zone.zoneId,
    name,
    type: 'CNAME',
    ttl: 300,
    records: [transferServer.endpoint]
  });
  new TerraformOutput(scope, 'domain', {
    description: 'FTP server domain name',
    value: {
      name: record.name
    }
  });
  return record;
}
