<script setup lang="ts">
import { ref, defineEmits } from "vue";
import "../styles/TodoInput.css";
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

<!-- スタイルは外部ファイル TodoInput.css に移動 -->
