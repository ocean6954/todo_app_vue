<script setup lang="ts">
const props = defineProps<{
  currentSort: "newest" | "oldest" | "random";
}>();

const emit = defineEmits<{
  (e: "change-sort", criteria: "newest" | "oldest" | "random"): void;
}>();

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const value = target.value as "newest" | "oldest" | "random";
  emit("change-sort", value);
};
</script>

<template>
  <!-- フィルタードロップダウン -->
  <div class="sort-section">
    <label for="sort-select">ソート:</label>
    <select
      id="sort-select"
      @change="handleSortChange"
      :value="props.currentSort"
      class="sort-dropdown"
    >
      <option value="oldest">古い順</option>
      <option value="newest">新しい順</option>
      <option value="random">ランダム</option>
    </select>
  </div>
</template>
