import { readFile } from 'fs/promises';
import type { Settings } from './settings';

export async function loadSettings(fileName: string): Promise<Settings> {
  const fileContent = await readFile(fileName, { encoding: 'utf-8' });
  return JSON.parse(fileContent) as Settings;
}
