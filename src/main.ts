import { App } from 'cdktf';
import { loadSettings } from './settings/load-settings';
import { createStack } from './stack/create-stack';
import { loadUsers } from './user/load-users';

/**
 * Application entry-point
 * @param settingsPath Path to the settings file
 */
async function main(settingsPath: string) {
  try {
    const settings = await loadSettings(settingsPath);
    const users = await loadUsers(settings.users.userNames, settings.users.keysPath);
    const app = new App();
    createStack(app, settings, users);
    app.synth();
  } catch (e) {
    console.error('Error: stack synthesis failed');
    console.error(e);
    process.exit(1);
  }
}

main(process.argv[2] ?? './sftp.json');
