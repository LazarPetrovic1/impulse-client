import { api } from "../../../lib/api";

export const issuesApi = {
  getAll: () => api.get("/issues"),
  getById: (id: number) => api.get(`/issues/${id}`),
  create: (data: any) => api.post("/issues", data),
  update: (id: number, data: any) => api.patch(`/issues/${id}`, data),
  remove: (id: number) => api.delete(`/issues/${id}`),
};