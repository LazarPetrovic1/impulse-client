const DB_NAME = 'chat-db';
const STORE = 'messages';

export const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = reject;
  });

export const saveMessages = async (messages: any[]) => {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  const store = tx.objectStore(STORE);
  messages.forEach((msg) => store.put(msg));
};

export const loadMessages = async (chatId: string) => {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readonly');
  const store = tx.objectStore(STORE);
  const all: any[] = [];
  return new Promise<any[]>((resolve) => {
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        if (cursor.value.chatId === chatId) all.push(cursor.value);
        cursor.continue();
      } else resolve(all);
    };
  });
};