<template>
  <tree-view
    :data="storeDoc.docDirectory"
    :expandAll="storeDoc.expandAllDocFiles"
    :selectedId="storeDoc.selectedDocFilePath"
    @select="props.select"
  />
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import TreeView from '../components/tree/tree-view.vue';
import { storeDoc } from '../store/doc';

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
</script>