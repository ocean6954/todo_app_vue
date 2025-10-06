<script setup lang="ts">
import type { Todo } from "../types/todo.ts";
import TodoItem from "./TodoItem.vue";

// Todoリスト
const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
  (e: "edit-todo", index: number, text: string): void;
}>();

const emitForEdit = (index: number, text: string) => {
  emit("edit-todo", index, text);
};
</script>

<template>
  <ul>
    <TodoItem
      v-for="(todo, index) in props.todos"
      :key="todo.id"
      :todo="todo"
      :index="index"
      :isEdit="todo.isEdit"
      @remove-todo="emit('remove-todo', $event)"
      @edit-todo="emitForEdit"
    />
  </ul>
</template>
