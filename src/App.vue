<script setup lang="ts">
import { ref, computed } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import type { Todo } from "./types/todo";
import { sampleTodos } from "./data/sample.ts";
import FilterButton from "./components/FilterButton.vue";
import SortButton from "./components/SortButton.vue";
import "./styles/App.css";

// Todoリスト
const todos = ref<Todo[]>(sampleTodos);

// フィルター状態
const currentFilter = ref<"all" | "active" | "completed">("all");
const currentSort = ref<"newest" | "oldest" | "random">("oldest");

// Todoを追加
function addTodo(text: string) {
  todos.value.push({
    id: todos.value.length + 1,
    text,
    isCompleted: false,
    isEdit: false,
    createdAt: new Date(),
  });
}

function removeTodo(id: number) {
  const index = todos.value.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.value.splice(index, 1);
  }
}

function handleEdit(id: number, text: string) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (!todo) return;

  if (todo.isEdit) {
    if (text.trim() === "") {
      // 空文字の場合は削除
      alert("タスクは１文字以上で入力してください");
      return;
    }
    // Save
    todo.text = text;
    todo.isEdit = false;
  } else {
    // Edit
    todo.isEdit = true;
  }
}

function toggleComplete(id: number) {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
  }
}

// フィルタリングされたTodos（computed プロパティで自動更新）
const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.isCompleted);
    case "completed":
      return todos.value.filter((todo) => todo.isCompleted);
    default:
      return todos.value;
  }
});

const sortedTodos = computed(() => {
  return [...filteredTodos.value].sort((a, b) => {
    if (currentSort.value === "newest") {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (currentSort.value === "oldest") {
      return a.createdAt.getTime() - b.createdAt.getTime();
    } else {
      return Math.random() - 0.5;
    }
  });
});

// フィルター変更関数
const changeFilter = (filter: "all" | "active" | "completed") => {
  currentFilter.value = filter;
};

const changeSort = (sort: "newest" | "oldest" | "random") => {
  currentSort.value = sort;
};
</script>

<template>
  <div class="app">
    <h1>Todo App</h1>
    <TodoInput @add-todo="addTodo" />

    <!-- フィルターとソートを横並びに -->
    <div class="controls-container">
      <FilterButton
        :current-filter="currentFilter"
        @change-filter="changeFilter"
      />
      <SortButton :current-sort="currentSort" @change-sort="changeSort" />
    </div>
    <TodoList
      :todos="sortedTodos"
      @remove-todo="removeTodo"
      @edit-todo="handleEdit"
      @complete-todo="toggleComplete"
    />
  </div>
</template>
