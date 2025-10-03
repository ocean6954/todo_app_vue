<script setup lang="ts">
import { ref, defineEmits } from "vue";
// 入力内容
const newTodo = ref("");
const emit = defineEmits<{
  (e: "add-todo", todo: string): void;
}>();

// Todoを追加
function submit() {
  if (newTodo.value.trim() !== "") {
    emit("add-todo", newTodo.value.trim());
    newTodo.value = "";
  }
}
</script>

<template>
  <div class="todo-input">
    <input v-model="newTodo" placeholder="Add a todo" />
    <button @click="submit">Add</button>
  </div>
</template>

<style scoped>
.todo-input {
  display: flex;
  gap: 8px;
}
</style>
