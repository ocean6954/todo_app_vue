// テスト用のモックデータ
import { vi } from "vitest";
import type { Todo, FilterCriteria, SortCriteria } from "../../types/todo";

// 基本的なTodoモックデータ
export const mockTodo: Todo = {
  id: 1,
  text: "テストタスク",
  isCompleted: false,
  createdAt: new Date("2023-01-01T10:00:00Z"),
  isEdit: false,
};

// 完了済みTodoモックデータ
export const mockCompletedTodo: Todo = {
  id: 2,
  text: "完了済みタスク",
  isCompleted: true,
  createdAt: new Date("2023-01-02T11:00:00Z"),
  isEdit: false,
};

// 編集中Todoモックデータ
export const mockEditingTodo: Todo = {
  id: 3,
  text: "編集中タスク",
  isCompleted: false,
  createdAt: new Date("2023-01-03T12:00:00Z"),
  isEdit: true,
};

// 複数のTodoリストモックデータ
export const mockTodoList: Todo[] = [
  {
    id: 1,
    text: "最初のタスク",
    isCompleted: false,
    createdAt: new Date("2023-01-01T10:00:00Z"),
    isEdit: false,
  },
  {
    id: 2,
    text: "完了済みタスク",
    isCompleted: true,
    createdAt: new Date("2023-01-02T11:00:00Z"),
    isEdit: false,
  },
  {
    id: 3,
    text: "未完了タスク",
    isCompleted: false,
    createdAt: new Date("2023-01-03T12:00:00Z"),
    isEdit: false,
  },
  {
    id: 4,
    text: "別の完了済みタスク",
    isCompleted: true,
    createdAt: new Date("2023-01-04T13:00:00Z"),
    isEdit: false,
  },
];

// 空のTodoリスト
export const mockEmptyTodoList: Todo[] = [];

// フィルター条件のモックデータ
export const mockFilterCriteria: FilterCriteria[] = [
  "all",
  "active",
  "completed",
];

// ソート条件のモックデータ
export const mockSortCriteria: SortCriteria[] = ["newest", "oldest", "random"];

// イベントオブジェクトのモック
export const mockInputEvent = (value: string) => ({
  target: { value } as HTMLInputElement,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
});

export const mockSelectEvent = (value: string) => ({
  target: { value } as HTMLSelectElement,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
});

export const mockKeyboardEvent = (key: string) => ({
  key,
  target: { value: "テスト入力" } as HTMLInputElement,
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
});

// Props用のモックデータ
export const mockTodoInputProps = {};

// TodoItemコンポーネントのprops用ファクトリー関数
export const createTodoItemProps = (todo: Todo) => ({
  todo,
  isEdit: todo.isEdit,
  isCompleted: todo.isCompleted,
});

// 便利な定数（従来のAPIとの互換性のため）
export const mockTodoItemProps = createTodoItemProps(mockTodo);
export const mockCompletedTodoItemProps =
  createTodoItemProps(mockCompletedTodo);
export const mockEditingTodoItemProps = createTodoItemProps(mockEditingTodo);

export const mockTodoListProps = {
  todos: mockTodoList,
};

// Emit関数のモック
export const mockEmit = vi.fn();

// 日付ユーティリティ
export const mockDate = new Date("2023-01-01T10:00:00Z");

export const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: 1,
  text: "デフォルトタスク",
  isCompleted: false,
  createdAt: mockDate,
  isEdit: false,
  ...overrides,
});
