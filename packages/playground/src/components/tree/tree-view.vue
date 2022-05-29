<template>
  <ul class="tree-view-container">
    <tree-item
      v-for="item in props.data" 
      :key="item.id" 
      :itemData="item"
      :expandAll="props.expandAll" 
      @selected="selected" 
      @expandTree="expandTree" />            
  </ul>
</template>

<script setup lang="ts">
import { TreeData } from './types';
import { defineProps, defineEmits } from 'vue';
import TreeItem from './tree-item.vue'

const emit = defineEmits<(e: 'selected' | 'expandTree', value: any) => void>()

const props = defineProps<{
  data: TreeData,
  expandAll: boolean,
}>()

const selected = (node) =>{
  console.log('node ===', node);
  emit('selected', node)
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
