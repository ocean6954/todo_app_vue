import type { Todo } from "../types/todo";

export const sampleTodos: Todo[] = [
  {
    id: 1,
    text: "Vue 3 の環境構築をする",
    isCompleted: false,
    createdAt: new Date("2025-10-01T09:00:00"),
    isEdit: false,
  },
  {
    id: 2,
    text: "TodoInput コンポーネントを作成",
    isCompleted: true,
    createdAt: new Date("2025-10-02T14:30:00"),
    isEdit: false,
  },
  {
    id: 3,
    text: "TodoList と TodoItem を接続",
    isCompleted: false,
    createdAt: new Date("2025-10-03T11:45:00"),
    isEdit: false,
  },
  {
    id: 4,
    text: "編集機能（Edit / Save）を追加",
    isCompleted: false,
    createdAt: new Date("2025-10-04T19:20:00"),
    isEdit: false,
  },
  {
    id: 5,
    text: "完了状態のスタイルを追加",
    isCompleted: true,
    createdAt: new Date("2025-10-05T08:10:00"),
    isEdit: false,
  },
];
