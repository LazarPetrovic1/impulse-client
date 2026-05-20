import { api } from "../../lib/api";

export const getPostsByTag = async (tag: string) => (await api.get(`/tagnames/${tag}/posts`)).data;
export * from './store/socialStore'
export interface SocialUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  sex?: "m" | "f" | "n/a";
  bio?: string;
  profile?: {
    employment?: string;
    website?: string;
    social?: Record<string, string>;
  };
}