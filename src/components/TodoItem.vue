<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "../types/todo";
import "../styles/TodoItem.css";

const props = defineProps<{
  todo: Todo;
  index: number;
  isEdit: boolean;
  isCompleted: boolean;
}>();

const emit = defineEmits<{
  (e: "remove-todo", index: number): void;
  (e: "edit-todo", index: number, text: string): void;
  (e: "complete-todo", index: number): void;
}>();

const editedText = ref(props.todo.text);
function handleEdit() {
  emit("edit-todo", props.index, editedText.value);
}

function emitForComplete(index: number) {
  emit("complete-todo", index);
}
</script>

<template>
  <li class="todo-item">
    <input
      type="checkbox"
      :checked="props.isCompleted"
      @change="emitForComplete(props.index)"
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
      <button @click="emit('remove-todo', index)" class="delete-btn">
        Delete
      </button>
    </div>
  </li>
</template>

<!-- スタイルは外部ファイル TodoItem.css に移動 -->
