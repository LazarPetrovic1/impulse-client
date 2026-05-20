export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'seen' | 'failed';
export type VectorClock = Record<string, number>;
export type Reaction = { emoji: string; userId: number; };
export type MessageEvent =
  | { type: 'create'; payload: Message }
  | { type: 'update'; payload: Partial<Message> }
  | { type: 'delete'; payload: { id: number; chatId: string } };
export type Message = {
  id?: number;        // server ID
  tempId?: string;    // client ID
  chatId: string;
  content: string;
  status: MessageStatus;
  createdAt?: string;
  updatedAt?: string;
  deleted?: boolean;
  vectorClock?: VectorClock;
  isOwn: boolean;
  sender: number | any; // either an ID or a full object
  replyTo?: Message;      // 👈 full object (hydrated)
  replyToId?: string;    // 👈 backend reference
  senderName?: string;
  reactions?: Reaction[];
  timestamp?: string;
  seen: boolean;
  isEdited?: boolean;
  senderId?: number;
  chat?: any;
};