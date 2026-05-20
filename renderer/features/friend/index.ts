export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';
export interface SendFriendRequestPayload { senderId: number; receiverId: number; }
export interface FriendRequestResponse { status: 'queued'; }
export * from './api'
export * from './friendRequestStore'
export * from './useFriendRequestSocket'
export * from './useFriends'
export * from './useFriendRequestSocketListener'