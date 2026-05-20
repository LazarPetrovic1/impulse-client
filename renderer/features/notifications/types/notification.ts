import { NotifType } from "../../../types";

export type Notification = {
  id: string | number;
  type: NotifType;
  content: string;
  url?: string;
  createdAt: Date;
  read?: boolean;
  body: string;
  // optional metadata
  actorId?: number;
  entityId: number;
  entityType?: string;
  isRead: boolean;
  updatedAt: Date;
  user: number;
};