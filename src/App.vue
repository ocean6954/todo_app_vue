<script setup lang="ts">
import { ref, computed } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import type { Todo } from "./types/todo";
import { sampleTodos } from "./data/sample.ts";
import FilterButton from "./components/FilterButton.vue";
import "./styles/App.css";

// Todoリスト
const todos = ref<Todo[]>(sampleTodos);

// フィルター状態
const currentFilter = ref<"all" | "active" | "completed">("all");

let nextId = 1;

// Todoを追加
function addTodo(text: string) {
  todos.value.push({
    id: nextId++,
    text,
    isCompleted: false,
    isEdit: false,
    createdAt: new Date(),
  });
}

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}

function handleEdit(index: number, text: string) {
  const todo = todos.value[index];
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

function toggleComplete(index: number) {
  const todo = todos.value[index];
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

// フィルター変更関数
const changeFilter = (filter: "all" | "active" | "completed") => {
  currentFilter.value = filter;
};
</script>

<template>
  <div class="app">
    <h1>Todo App</h1>
    <TodoInput @add-todo="addTodo" />
    <FilterButton
      :current-filter="currentFilter"
      @change-filter="changeFilter"
    />
    <TodoList
      :todos="filteredTodos"
      @remove-todo="removeTodo"
      @edit-todo="handleEdit"
      @complete-todo="toggleComplete"
    />
  </div>
</template>

<!-- スタイルは外部ファイル App.css に移動 -->
