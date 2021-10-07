import type { Construct } from 'constructs';
import type { Settings } from '../settings/settings';
import type { User } from '../user/user';
import { createBucket } from './bucket/create-bucket';
import { createDnsRecord } from './dns/create-dns-record';
import { createProvider } from './provider/create-provider';
import { createAssumeRolePolicyDocument } from './security/create-assume-role-policy-document';
import { createLoggingRole } from './security/create-logging-role';
import { createTransferUserRole } from './security/create-transfer-user-role';
import { createTransferServer } from './server/create-transfer-server';
import { createUserWith } from './user/create-user-with';

/**
 * Defines a stack
 * @param scope Scope
 * @param settings Settings
 * @param users List of users
 */
export function defineStack(scope: Construct, settings: Settings, users: ReadonlyArray<User>): void {
  const { bucket, domain, profile, region, roles, tags } = settings;
  createProvider(scope, { profile, region, tags });
  createBucket(scope, { bucket });
  const assumeRolePolicyDocument = createAssumeRolePolicyDocument(scope);
  const loggingRole = createLoggingRole(scope, { assumeRolePolicyDocument, name: roles.logging, region });
  const transferServer = createTransferServer(scope, { loggingRole });
  const transferUserRole = createTransferUserRole(scope, { assumeRolePolicyDocument, bucket, name: roles.user });
  users.forEach(createUserWith(scope, { bucket, transferUserRole, transferServer }));
  if (domain) {
    createDnsRecord(scope, { name: domain.name, transferServer, zoneName: domain.zone });
  }
}
