<template>
  <tree-view 
    :data="treeData"
    :expandAll="expandAll"
    :selectedId="state.selectedId"
    @select="select"
  />
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import TreeView from './tree-view.vue';

const state = reactive<{
  selectedId: string | null
}>({ selectedId: null })

const expandAll = true;
const  treeData = [0,1,2].map((i) => {
  return {
    id: `${i}`,
    text: `item-${i}`,
    children: [0,1,2,3].map((j) => {
      return {
        id: `${i}-${j}`,
        text: `item-${i}-${j}`,
        children:  [0,1,2,3,4].map((k) => {
          return {
            id: `${i}-${j}-${k}`,
            text: `item-${i}-${j}-${k}`,
            children: []
          }
        })
      }
    })
  };
})

const select = (node) => {
  if (!(node.children && node.children.length > 0)) {
    state.selectedId = node.id;
    console.log('node ===', node);
  }
};
</script>