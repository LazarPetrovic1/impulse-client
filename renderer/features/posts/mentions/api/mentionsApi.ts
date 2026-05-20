import { api } from "../../../../lib/api";

export async function searchUsers(query: string, callback: Function) {
  if (!query) return [];
  const { data } = await api.get(`/users?q=${query}`);
  callback(
    data.map((u) => ({
      id: u.id,
      display: u.username,
    }))
  );
}

export function searchTags(query: string, callback: Function) {
  if (!query) return;
  api.get(`/tagnames/search?q=${query}`)
    .then((res) => res.data())
    .then((data) => {
      callback(data.map((tag) => ({ id: tag.name, display: tag.name })));
    });
}