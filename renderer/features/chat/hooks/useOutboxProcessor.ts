import { useEffect } from 'react';
import { useOutboxStore } from '../store';
import { sendMessage } from '../api';

export const useOutboxProcessor = () => {
  const { queue, dequeue } = useOutboxStore();

  useEffect(() => {
    const processQueue = async () => {
      for (const msg of queue) {
        try {
          console.log("%cOUTBOX PROCESSOR SEND MSG", "color: yellow; font-size: 1.3rem;", msg);
          await sendMessage(msg);
          dequeue(msg.tempId);
        } catch {
          // stop processing if still offline
          break;
        }
      }
    };

    window.addEventListener('online', processQueue);
    return () => { window.removeEventListener('online', processQueue); };
  }, [queue]);
};