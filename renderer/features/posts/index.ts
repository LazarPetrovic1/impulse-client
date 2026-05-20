import { Reaction } from './types'

export * from './api/postsApi'
export * from './store/postsStore'
export * from './hooks/usePosts'
export * from './hooks/useInfinitePosts'
export * from './hooks/useMyPosts'
export * from './types'

export const getReactionEmoji = (r: Reaction) => {
  return {
    like: '👍',
    love: '❤️',
    laugh: '😂',
    impressed: '😮',
    dislike: '👎',
    hate: '😡'
  }[r];
};