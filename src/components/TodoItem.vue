<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../types/todo";
import "../styles/TodoItem.css";

const props = defineProps<{
  todo: Todo;
  isEdit: boolean;
  isCompleted: boolean;
}>();

const emit = defineEmits<{
  (e: "remove-todo", id: number): void;
  (e: "edit-todo", id: number, text: string): void;
  (e: "complete-todo", id: number): void;
}>();

const editedText = ref(props.todo.text);
const handleEdit = () => {
  emit("edit-todo", props.todo.id, editedText.value);
};

const emitForComplete = () => {
  emit("complete-todo", props.todo.id);
};
</script>

<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="props.isCompleted"
      @change="emitForComplete"
    />

    <!-- 編集中の場合 -->
    <input
      v-if="props.isEdit"
      type="text"
      v-model="editedText"
      class="edit-input"
      @keyup.enter="handleEdit"
      @keyup.escape="handleEdit"
    />

    <!-- 完了状態の場合 -->
    <span v-else-if="props.isCompleted" class="complete">
      {{ props.todo.text }}
    </span>

    <!-- 通常状態の場合 -->
    <span v-else class="normal">
      {{ props.todo.text }}
    </span>

    <div class="button-group">
      <button
        v-if="!props.isEdit && !props.isCompleted"
        @click="handleEdit"
        class="edit-btn"
      >
        Edit
      </button>
      <button v-if="props.isEdit" @click="handleEdit" class="save-btn">
        Save
      </button>
      <button @click="emit('remove-todo', props.todo.id)" class="delete-btn">
        Delete
      </button>
      <!-- <span>(デバッグ用: {{ props.todo.id }})</span> -->
    </div>
  </li>
</template>
