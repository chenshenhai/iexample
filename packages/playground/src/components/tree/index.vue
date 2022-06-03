<template>
  <tree-view
    :data="props.defaultData"
    :expandAll="props.expandAll"
    :selectedId="state.selectedId"
    @select="props.select"
  />
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import TreeView from './tree-view.vue';

const props = defineProps<{
  defaultData?: DocFile[],
  expandAll?: boolean,
  selectedId?: string,
  select?: (node: DocFile) => void,
}>()

const state = reactive<{
  selectedId?: string | null
}>({ selectedId: null })

onMounted(() => {
  state.selectedId = props.selectedId
})

// const expandAll = true;
// const  treeData = [0,1,2].map((i) => {
//   return {
//     id: `${i}`,
//     text: `item-${i}`,
//     children: [0,1,2,3].map((j) => {
//       return {
//         id: `${i}-${j}`,
//         text: `item-${i}-${j}`,
//         children:  [0,1,2,3,4].map((k) => {
//           return {
//             id: `${i}-${j}-${k}`,
//             text: `item-${i}-${j}-${k}`,
//             children: []
//           }
//         })
//       }
//     })
//   };
// })
// const select = (node) => {
//   if (!(node.children && node.children.length > 0)) {
//     state.selectedId = node.id;
//     console.log('node ===', node);
//   }
// };
</script>