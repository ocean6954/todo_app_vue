<script setup lang="ts">
import type { Todo } from "../types/todo.ts";
import TodoItem from "./TodoItem.vue";

// Todoリスト
const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
}>();
</script>

<template>
  <ul>
    <TodoItem
      v-for="(todo, index) in props.todos"
      :key="todo.id"
      :todo="todo"
      :index="index"
      @remove-todo="emit('remove-todo', $event)"
    />
  </ul>
</template>
