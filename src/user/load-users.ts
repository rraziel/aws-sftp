import { loadUser } from './load-user';
import type { User } from './user';

/**
 * Loads users
 * @param userNames List of user names
 * @param keysPath Path to the key files
 * @returns List of users
 */
export function loadUsers(userNames: ReadonlyArray<string>, keysPath: string): Promise<ReadonlyArray<User>> {
  return Promise.all(userNames.map(userName => loadUser(userName, keysPath)));
}
