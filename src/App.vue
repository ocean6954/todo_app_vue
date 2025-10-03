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
    createdAt: new Date(),
  });
}

function removeTodo(index: number) {
  todos.value.splice(index, 1);
}
</script>

<template>
  <div class="app">
    <h1>Todo App</h1>
    <TodoInput @add-todo="addTodo" />
    <TodoList :todos="todos" @remove-todo="removeTodo" />
  </div>
</template>
