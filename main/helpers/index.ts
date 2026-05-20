import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
export * from './create-window'

const TOKEN_FILE = path.join(process.env.DATA_DIR || path.resolve(__dirname, '../../data'), `device-tokens-${process.pid}.json`);

export const retrievePushToken = async (): Promise<string> => {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = fs.readFileSync(TOKEN_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed.token) return parsed.token;
    }
    const token = crypto.randomUUID();
    fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token }), 'utf-8');

    // register with backend (just for completeness)
    try {
      await axios.post(`${process.env.API_URL}/notifs/register-device`, { token }, { withCredentials: true });
    } catch (err) { console.warn('Failed to register device on backend', err); }
    return token;
  } catch (err) {
    console.error('Failed to retrieve or generate push token', err);
    throw err;
  }
};