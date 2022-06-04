<template>
  <tree-view
    :data="storeDoc.docDirectory"
    :expandAll="storeDoc.expandAllDocFiles"
    :selectedFilePath="storeDoc.selectedDocFilePath"
    @selectFile="storeDoc.onSelectDocFile"
  />
</template>
<script setup lang="ts">
import TreeView from '../components/tree/tree-view.vue';
import { storeDoc } from '../store/doc';
</script>