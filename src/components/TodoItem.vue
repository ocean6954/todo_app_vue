<script setup lang="ts">
import type { Todo } from "../types/todo";

const props = defineProps<{
  todo: Todo;
  index: number;
  isEdit: boolean;
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
  (e: "edit-todo", index: number): void;
}>();

function handleEdit() {
  console.log("Edit button clicked for todo:", props.todo.text);
  emit("edit-todo", props.index);
}
</script>

<template>
  <li>
    <span v-if="!props.isEdit"> {{ props.todo.text }}</span>
    <input v-else type="text" :value="props.todo.text" />
    <button v-if="!props.isEdit" @click="handleEdit">Edit</button>
    <button v-else @click="handleEdit">Save</button>
    <button @click="emit('remove-todo', index)">Delete</button>
  </li>
</template>
