<template>
  <ul class="tree-view-container">
    <tree-item
      v-for="item in props.data"
      :key="item.path"
      :itemData="item"
      :expandAll="props.expandAll"
      :selectedFilePath="props.selectedFilePath"
      @select="select"
      @expandTree="expandTree"
    />
  </ul>
</template>

<script setup lang="ts">
import { toRaw } from "vue";
import type { TreeData, TreeDataItem } from "./types";
import TreeItem from "./tree-item.vue";

const emit =
  defineEmits<(e: "selectFile" | "expandTree", value: any) => void>();

const props = defineProps<{
  data: TreeData;
  expandAll: boolean;
  selectedFilePath?: string | null;
}>();

const select = (node: TreeDataItem) => {
  if (!(node.children && node.children.length > 0)) {
    emit("selectFile", toRaw(node));
  }
};
const expandTree = (node: TreeDataItem) => {
  emit("expandTree", toRaw(node));
};
</script>

<style scoped>
.tree-view-container {
  position: relative;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
