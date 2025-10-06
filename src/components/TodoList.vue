<script setup lang="ts">
import type { Todo } from "../types/todo.ts";
import TodoItem from "./TodoItem.vue";

// Todoリスト
const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: "remove-todo", id: number): void;
  (e: "edit-todo", id: number, text: string): void;
  (e: "complete-todo", id: number): void;
}>();

const emitForRemove = (id: number) => {
  emit("remove-todo", id);
};

const emitForComplete = (id: number) => {
  emit("complete-todo", id);
};

const emitForEdit = (id: number, text: string) => {
  emit("edit-todo", id, text);
};
</script>

<template>
  <ul>
    <TodoItem
      v-for="todo in props.todos"
      :key="todo.id"
      :todo="todo"
      :isEdit="todo.isEdit"
      :isCompleted="todo.isCompleted"
      @remove-todo="emitForRemove"
      @edit-todo="emitForEdit"
      @complete-todo="emitForComplete"
    />
  </ul>
</template>
