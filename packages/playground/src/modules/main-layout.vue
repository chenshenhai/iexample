<template>
  <div class="main-layout-container">
    <layout-column class="main-layout-preview" 
      :defaultLeftWidth="220" 
      :unit="'px'"
    >
      <template #left>
        <layout-row style="{{width: '100%', height: '100%'}}"
          :defaultTopHeight="50"
          :unit="'%'"
        >
          <template #top>
            <Tree />
          </template>
          <template #bottom>
            <code-list />
          </template>
        </layout-row>
      </template>
      <template #right>
        <layout-column class="main-layout-preview" 
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
    </layout-column>
  </div>
</template>

<script setup lang="ts" >
import { reactive, onMounted, watch, toRaw } from 'vue';
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import CodeEditor from './code-editor.vue';
import CodeList from './code-list.vue';
import HtmlPreview from '../components/html-preview/index.vue';
import { storeGlobal } from '../store/global';
import { runtime } from '../runtime/common';
import Tree from '../components/tree/index.vue';

const state = reactive<{
  source: string | null,
}>({
  source: null,
})

onMounted(() => {
  if (storeGlobal.entryCodeFilePath) {
    state.source = runtime(
      toRaw(storeGlobal.entryCodeFilePath),
      toRaw(storeGlobal.codeDirectory)
    )
  }
})

watch(storeGlobal.codeDirectory, () => {
  if (storeGlobal.entryCodeFilePath) {
    state.source = runtime(
      toRaw(storeGlobal.entryCodeFilePath),
      toRaw(storeGlobal.codeDirectory)
    )
  }
})

</script>

<style scoped>
.main-layout-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-layout-preview {
  height: 100%;
}
.main-layout-preview-result {
  width: 100%;
}

.main-layout-preview-question {
  display: inline-block;
  width: 360px;
  padding: 20px;
  text-align: left;
  background: #2196f340;
}


</style>
