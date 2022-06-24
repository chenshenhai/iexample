<template>
  <tree-view
    :data="props.defaultData || []"
    :expandAll="props.expandAll || false"
    :selectedFilePath="state.selectedFilePath"
    @selectFile="props.select"
  />
</template>
<script setup lang="ts">
import { reactive, onMounted } from "vue";
import TreeView from "./tree-view.vue";
import type { DocFile } from "../../types";

const props = defineProps<{
  defaultData?: DocFile[];
  expandAll?: boolean;
  selectedFilePath?: string;
  select?: (node: DocFile) => void;
}>();

const state = reactive<{
  selectedFilePath?: string | null;
}>({ selectedFilePath: null });

onMounted(() => {
  state.selectedFilePath = props.selectedFilePath;
});

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
//     state.selectedFilePath = node.path;
//     console.log('node ===', node);
//   }
// };
</script>
