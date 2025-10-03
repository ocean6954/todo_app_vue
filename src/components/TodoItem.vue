<script setup lang="ts">
import type { Todo } from "../types/todo";

const props = defineProps<{
  todo: Todo;
  index: number;
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
}>();
</script>

<template>
  <li>
    <span>{{ props.todo.text }}</span>
    <button @click="emit('remove-todo', index)">Delete</button>
  </li>
</template>
