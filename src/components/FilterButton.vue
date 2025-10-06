<script setup lang="ts">
import "../styles/ToggleLists.css";

// 親から現在のフィルター状態を受け取る
const props = defineProps<{
  currentFilter: "all" | "active" | "completed";
}>();

const emit = defineEmits<{
  (e: "change-filter", criteria: "all" | "active" | "completed"): void;
}>();

// 値が変更された時に親に通知（refは不要！）
const handleFilterChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const value = target.value as "all" | "active" | "completed";
  emit("change-filter", value);
};
</script>

<template>
  <!-- フィルタードロップダウン -->
  <div class="filter-section">
    <label for="filter-select">表示フィルター:</label>
    <select
      id="filter-select"
      :value="props.currentFilter"
      @change="handleFilterChange"
      class="filter-dropdown"
    >
      <option value="all">全て</option>
      <option value="active">未完了</option>
      <option value="completed">完了済み</option>
    </select>
  </div>
</template>
