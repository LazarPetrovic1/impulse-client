export enum SocketEvents {
  // SOCKET
  CONNECT = 'connect',

  // CHAT (client → server)
  CHAT_CREATE = 'chat.create.v1',
  CHAT_FIND_ALL = 'chat.find-all.v1',
  CHAT_FIND_ONE = 'chat.find-one.v1',
  CHAT_JOIN = 'chat.join.v1',
  CHAT_FIND_MINE = 'chat.find-all-mine.v1',
  CHAT_FIND_ALL_MESSAGES = 'chat.find-all-messages.v1',
  CHAT_TYPING = 'chat.typing.v1',
  CHAT_TYPING_STOP = 'chat.typing.stop.v1',

  // MESSAGE (client → server)
  MESSAGE_SEND = 'message.send.v1',
  MESSAGE_FIND_ALL = 'message.find-all.v1',
  MESSAGE_FIND_ONE = 'message.find-one.v1',
  MESSAGE_EDIT = 'message.edit.v1',
  MESSAGE_DELETE = 'message.delete.v1',
  MESSAGE_FIND_MULTIPLE = 'message.find-multiple-by-id.v1',
  MESSAGE_SEE = 'message.see.v1',
  MESSAGE_REACT = 'message.react.v1',
  MESSAGE_REPLY = "message.reply.v1",
  
  // 🔥 REDIS → CLIENT (server → client)
  CHAT_MESSAGE = 'chat.message.v1',
  CHAT_CREATED = 'chat.created.v1',
  MESSAGE_UPDATED = 'chat.message.updated.v1',
  MESSAGE_DELETED = 'chat.message.deleted.v1',
  MESSAGE_REACTED = 'message.reacted.v1',
  MESSAGE_SEEN = 'message.see.v1',
  MESSAGE_REPLIED = "message.replied.v1",
  MESSAGE_DELIVERED = 'message.deliver.v1',

  // STREAM
  CHAT_STREAM = 'chat-messages.v1',

  // NOTIFS (optional if used in UI)
  NOTIF_CREATED = 'notif.created.v1',
}

export enum FriendSocketEvents {
  // SOCKET
  CONNECT = 'connect',

  // =========================
  // 👤 CLIENT → SERVER (commands)
  // =========================
  FRIEND_REQUEST_SEND = 'notif.send-friend-request.v1',
  FRIEND_REQUEST_ACCEPT = 'notif.accept-friend-request.v1',
  FRIEND_REQUEST_REJECT = 'notif.reject-friend-request.v1',

  // =========================
  // 🔥 SERVER → CLIENT (Redis fanout / state updates)
  // =========================
  FRIEND_REQUEST_CREATED = 'notif.friend-request.v1',
  FRIEND_REQUEST_ACCEPTED = 'notif.accept-friend-request.v1',
  FRIEND_REQUEST_REJECTED = 'notif.reject-friend-request.v1',
}