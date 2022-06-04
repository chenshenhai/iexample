<template>
  <layout-column class="code-view-preview" 
    :defaultLeftWidth="50"
    :unit="'%'"
  >
    <template #left class="left">
      <code-editor />
    </template>
    <template #right class="right">
      <layout-row style="{{width: '100%', height: '100%'}}"
        :defaultTopHeight="50"
        :unit="'%'"
      >
        <template #top>
          <HtmlPreview 
            :status="'LOADED'"
            :source="state.source"
          />
        </template>
        <template #bottom>
          <div>Bottom</div>
        </template>
      </layout-row>
    </template>
  </layout-column>
</template>

<script setup lang="ts" >
import { reactive, onMounted, watch, toRaw } from 'vue';
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import CodeEditor from './code-editor.vue';
import HtmlPreview from '../components/html-preview/index.vue';
import { storeCode } from '../store/code';
import { runtime } from '../runtime/common';

const state = reactive<{
  source: string | null,
}>({
  source: null,
})

onMounted(() => {
  if (storeCode.entryCodeFilePath) {
    state.source = runtime(
      toRaw(storeCode.entryCodeFilePath),
      toRaw(storeCode.codeDirectory)
    )
  }
})

watch(() => [
  storeCode.codeDirectory,
  storeCode.entryCodeFilePath,
  storeCode.currentCodeFile,
  storeCode.currentCodeFilePath,
], () => {
  if (storeCode.entryCodeFilePath) {
    state.source = runtime(
      toRaw(storeCode.entryCodeFilePath),
      toRaw(storeCode.codeDirectory)
    )
  }
})

</script>

<style scoped>
.code-view-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.code-view-preview {
  height: 100%;
}
.code-view-preview-result {
  width: 100%;
}

.code-view-preview-question {
  display: inline-block;
  width: 360px;
  padding: 20px;
  text-align: left;
  background: #2196f340;
}


</style>
