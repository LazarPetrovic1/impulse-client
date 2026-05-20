// exportable types
export type AlertType = { id: string; message: string; type: "info" | "success" | "error" }
export type NotifType = 'reaction' |
  'comment' | 'follow' | 'reply' |
  'friendrequest' | 'friendrequest_accepted' |
  'friendrequest_rejected' | 'mention' |
  'login' | 'register' | 'group_created' |
  'group_invite' | 'group_request' | 'group_promoted';
export type NotificationType = {
  actor?: number;
  body: string;
  createdAt: Date;
  deletedAt?: Date;
  entityId: number;
  id: number | string;
  type: NotifType;
  entityType?: string;
  isRead: boolean;
  updatedAt: Date;
  user: number;
}