<script setup lang="ts">
import type { FilterCriteria } from "../types/todo";

const emit = defineEmits<{
  (e: "change-filter", criteria: FilterCriteria): void;
}>();

const currentFilter = defineModel<FilterCriteria>();
</script>

<template>
  <div class="filter-section">
    <label for="filter-select">表示フィルター:</label>
    <select id="filter-select" v-model="currentFilter" class="filter-dropdown">
      <option value="all">全て</option>
      <option value="active">未完了</option>
      <option value="completed">完了済み</option>
    </select>
  </div>
</template>

<style scoped>
.filter-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-dropdown {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 13px;
  cursor: pointer;
  color: #666;
}

.filter-dropdown:focus {
  outline: none;
  border-color: #999;
  box-shadow: none;
}

label {
  font-weight: normal;
  color: #666;
  font-size: 13px;
}
</style>
