import { config } from "../../lib/config";
import { EntityName } from "./entities";

async function request(method: string, path: string, body?: unknown) {
  const response = await fetch(`${config.API_URL}/api${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}\n${text}`);
  }
  return response.json();
}

async function chatReq(method: string, path: string, body?: unknown) {
  const response = await fetch(`${config.CHAT_URL}/api${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status} ${response.statusText}\n${text}`);
  }
  return response.json();
}

export function apiPost(entity: EntityName, body: unknown) {
  let url = `/${entity}`;
  if (entity === "chats") return chatReq("POST", url, body);
  if (entity === "posts") url += `/terminal`;
  return request("POST", url, body);
}

export function apiPut(entity: EntityName, id: string, body: unknown) {
  if (entity === "chats") return chatReq("PUT", `/${entity}/${id}`, body)
  return request("PUT", `/${entity}/${id}`, body);
}

export async function apiGet(entity: EntityName, id?: string) {
  const base = entity === "chats" ? config.CHAT_URL : config.API_URL;
  let url: string;
  if (id) url = `${base}/api/${entity}/${id}`;
  if (!id) {
    if (entity === "users" || entity === "notifs" || entity === "posts") url = `${base}/api/${entity}/all`;
    else url = `${base}/api/${entity}`;
  }
  // const url = id ? `${base}/api/${entity}/${id}` : `${base}/api/${entity}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}