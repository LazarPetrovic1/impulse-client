export type Operation = {
  id: string;
  messageId: string;
  type: 'insert' | 'delete';
  position: number;
  value?: string;
  timestamp: number;
};