import { User } from "../auth/store";

export type Reaction = 'like' | 'love' | 'laugh' | 'impressed' | "dislike" | "hate";
export type ReactionsMap = Record<Reaction, number>;

export interface Tag {
  id: number;
  name: string;
  post?: number;
}

export interface Post {
  id: number;
  user: number | User; // depending on how backend returns it
  name?: string;
  description?: string;
  content?: string;
  tags?: Tag[];
  totalReactions: number;
  commentsCount: number;
  createdAt?: string;
  updatedAt?: string;
  reactions: ReactionsMap;
  media?: string[]
  viewerReaction?: Reaction;
}