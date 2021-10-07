import { TerraformStack } from 'cdktf';
import type { Construct } from 'constructs';
import type { User } from 'src/user/user';
import type { Settings } from '../settings/settings';
import { defineStack } from './define-stack';

/**
 * Creates a stack
 * @param scope Scope
 * @param settings Settings
 * @param users Users
 * @returns Terraform stack
 */
export function createStack(scope: Construct, settings: Settings, users: ReadonlyArray<User>): TerraformStack {
  return new (class extends TerraformStack {
    constructor(scope: Construct) {
      super(scope, 'ftp');
      defineStack(this, settings, users);
    }
  })(scope);
}
