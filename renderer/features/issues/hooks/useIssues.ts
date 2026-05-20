import { useIssueStore } from "../store/issueStore";
import { issuesApi } from "../api/issuesApi";

export const useIssues = () => {
  const store = useIssueStore();

  const fetchIssues = async () => {
    const res = await issuesApi.getAll();
    store.setIssues(res.data);
  };

  const fetchIssueById = async (id: number) => {
    const res = await issuesApi.getById(id);
    store.setSelectedIssue(res.data);
    return res.data;
  };

  const createIssue = async (payload: any) => {
    const res = await issuesApi.create(payload);
    store.addIssue(res.data);
    return res.data;
  };

  const updateIssue = async (id: number, payload: any) => {
    const res = await issuesApi.update(id, payload);
    store.updateIssue(id, res.data);
    return res.data;
  };

  const deleteIssue = async (id: number) => {
    await issuesApi.remove(id);
    store.removeIssue(id);
  };

  return {
    ...store,
    fetchIssues,
    fetchIssueById,
    createIssue,
    updateIssue,
    deleteIssue,
  };
};