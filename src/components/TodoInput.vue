<script setup lang="ts">
import { ref, defineEmits } from "vue";
// 入力内容
const newTodo = ref("");
const emit = defineEmits<{
  (e: "add-todo", text: string): void;
}>();

// Todoを追加
function submit() {
  const text = newTodo.value.trim();
  if (text === "") {
    alert("タスクは１文字以上で入力してください");
    return;
  }
  emit("add-todo", text);
  newTodo.value = "";
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
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.todo-input input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
}

button:hover {
  background-color: #369970;
}
</style>
