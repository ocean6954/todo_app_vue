<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { SortCriteria } from "../types/todo";
const props = defineProps<{
  currentSort: SortCriteria;
}>();

const emit = defineEmits<{
  (e: "change-sort", criteria: SortCriteria): void;
}>();

const validSorts: SortCriteria[] = ["oldest", "newest", "random"];

const initialSort = computed(() =>
  validSorts.includes(props.currentSort) ? props.currentSort : "oldest"
);

const sortValue = ref<SortCriteria>(initialSort.value);

watch(
  () => props.currentSort,
  (newSort) => {
    sortValue.value = validSorts.includes(newSort) ? newSort : "oldest";
  }
);

watch(sortValue, (newValue) => {
  emit("change-sort", newValue);
});
</script>

<template>
  <div class="sort-section">
    <label for="sort-select">ソート:</label>
    <select id="sort-select" v-model="sortValue" class="sort-dropdown">
      <option value="oldest">古い順</option>
      <option value="newest">新しい順</option>
      <option value="random">ランダム</option>
    </select>
  </div>
</template>

<style scoped>
.sort-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-dropdown {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 13px;
  cursor: pointer;
  color: #666;
}

.sort-dropdown:focus {
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
