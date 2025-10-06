export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  isEdit: boolean;
}

export type FilterCriteria = "all" | "active" | "completed";
export type SortCriteria = "newest" | "oldest" | "random";
