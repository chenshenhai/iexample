<template>
  <ul class="tree-view-container">
    <tree-item
      v-for="item in props.data" 
      :key="item.id" 
      :itemData="item"
      :expandAll="props.expandAll" 
      :selectedId="props.selectedId"
      @select="select" 
      @expandTree="expandTree" />            
  </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { TreeData } from './types';
import TreeItem from './tree-item.vue'

const emit = defineEmits<(e: 'select' | 'expandTree', value: any) => void>()

const props = defineProps<{
  data: TreeData,
  expandAll: boolean,
  selectedId?: string | null,
}>();

const select = (node) =>{
  emit('select', node)
};
const expandTree = (node) =>{
  emit('expandTree', node)
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
