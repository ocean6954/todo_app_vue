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
  (e: "complete-todo", index: number): void;
}>();

const emitForRemove = (index: number) => {
  emit("remove-todo", index);
};

const emitForComplete = (index: number) => {
  emit("complete-todo", index);
};

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
      :isCompleted="todo.isCompleted"
      @remove-todo="emitForRemove"
      @edit-todo="emitForEdit"
      @complete-todo="emitForComplete"
    />
  </ul>
</template>
