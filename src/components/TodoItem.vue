<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../types/todo";

const props = defineProps<{
  todo: Todo;
  index: number;
  isEdit: boolean;
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
  (e: "edit-todo", index: number, text: string): void;
}>();

const editedText = ref(props.todo.text);
function handleEdit() {
  emit("edit-todo", props.index, editedText.value);
}
</script>

<template>
  <li>
    <span v-if="!props.isEdit"> {{ props.todo.text }}</span>
    <input v-else type="text" v-model="editedText" />
    <button v-if="!props.isEdit" @click="handleEdit">Edit</button>
    <button v-else @click="handleEdit">Save</button>
    <button @click="emit('remove-todo', index)">Delete</button>
  </li>
</template>
