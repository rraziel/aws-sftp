import { readFile } from 'fs/promises';
import type { User } from './user';

/**
 * Loads a user
 * @param userName User name
 * @param keysPath Path to the key files
 * @returns User
 */
export async function loadUser(userName: string, keysPath: string): Promise<User> {
  const filePath = `${keysPath}/${userName}.pub`;
  const homePath = `/${userName}`;

  try {
    const key = await readFile(filePath, { encoding: 'utf-8' });
    return {
      name: userName,
      homePath,
      key
    };
  } catch (e) {
    console.error(`Error: unable to load public key ${filePath} for user ${userName}`);
    throw e;
  }
}
