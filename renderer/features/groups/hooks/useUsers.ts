import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

const getUsers = async (query: string) => {
  try { return (await api.get(`/users?q=${query}`)).data; }
  catch (e) { console.warn(`Error @getUsers ::: ${e.name}; ${e.message}`); throw e; }
}

export function useUsers(query: string) {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => getUsers(query),
    enabled: query.length > 1,
  });
}