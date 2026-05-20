export const encryptMessage = async (key: CryptoKey, text: string) => {
  const encoded = new TextEncoder().encode(text);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return { cipher, iv };
};

export const decryptMessage = async (key, cipher, iv) => {
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return new TextDecoder().decode(decrypted);
};

const chatKeys: Record<string, CryptoKey> = {}; // in-memory cache

export const getChatKey = async (chatId: string): Promise<CryptoKey> => {
  if (!chatKeys[chatId]) {
    // generate or fetch key
    const rawKey = crypto.getRandomValues(new Uint8Array(32));
    chatKeys[chatId] = await crypto.subtle.importKey( 'raw', rawKey, 'AES-GCM', true, ['encrypt', 'decrypt']);
  }
  return chatKeys[chatId];
};