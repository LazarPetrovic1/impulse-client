import { api } from "../../../lib/api";
export const registerDevice = async (token: string) =>
  await api.post('/notifs/register-device', { token });