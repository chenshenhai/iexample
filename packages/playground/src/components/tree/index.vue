<template>
  <tree-view 
    :data="treeData"
    :expandAll="expandAll"
  />
</template>
<script setup lang="ts">
import TreeView from './tree-view.vue';
const expandAll = true;
const  treeData = [0,1,2].map((i) => {
  return {
    id: `${i}`,
    text: `item-${i}`,
    children: [0,1,2,3].map((j) => {
      return {
        id: `${i}`,
        text: `item-${i}-${j}`,
        children:  [0,1,2,3,4].map((k) => {
          return {
            id: `${i}`,
            text: `item-${i}-${j}-${k}`,
            children: []
          }
        })
      }
    })
  };
})
</script>