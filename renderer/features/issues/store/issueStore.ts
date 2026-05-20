import { create } from "zustand";
import { User } from "../../auth/store";

export interface IMedia {
  name: string;
  type: string;
  src: string;
}

export interface Issue {
  id: number;
  user: User;
  author: string;
  body: string;
  media?: IMedia;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IssueState {
  issues: Issue[];
  selectedIssue: Issue | null;

  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: number, patch: Partial<Issue>) => void;
  removeIssue: (id: number) => void;
  setSelectedIssue: (issue: Issue | null) => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  selectedIssue: null,

  setIssues: (issues) => set({ issues }),

  addIssue: (issue) => set((state) => ({ issues: [issue, ...state.issues] })),

  updateIssue: (id, patch) =>
    set((state) => ({
      issues: state.issues.map((i) =>
        i.id === id ? { ...i, ...patch } : i
      ),
    })),

  removeIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((i) => i.id !== id),
    })),

  setSelectedIssue: (issue) => set({ selectedIssue: issue }),
}));