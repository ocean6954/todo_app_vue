<script setup lang="ts">
import { ref } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import type { Todo } from "./types/todo";

// Todoリスト
const todos = ref<Todo[]>([]);
let nextId = 1;

// Todoを追加
function addTodo(text: string) {
  todos.value.push({
    id: nextId++,
    text,
    completed: false,
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
</script>

<template>
  <div class="app">
    <h1>Todo App</h1>
    <TodoInput @add-todo="addTodo" />
    <TodoList
      :todos="todos"
      @remove-todo="removeTodo"
      @edit-todo="handleEdit"
    />
  </div>
</template>
