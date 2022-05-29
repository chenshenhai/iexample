<template>
  <div class="code-preview-container">
    <layout-column class="code-preview" 
      :defaultLeftWidth="220" 
      :unit="'px'"
    >
      <template #left>
        <layout-row style="{{width: '100%', height: '100%'}}"
          :defaultTopHeight="50"
          :unit="'%'"
        >
          <template #top>
            <iexample-list />
          </template>
          <template #bottom>
            <div>List</div>
          </template>
        </layout-row>
      </template>
      <template #right>
        <layout-column class="code-preview" 
          :defaultLeftWidth="50"
          :unit="'%'"
        >
          <template #left class="left">
            <iexample-editor />
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
import { reactive, onMounted, watchEffect, watch, toRaw } from 'vue';
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import IexampleEditor from './editor.vue';
import IexampleList from './list.vue';
import HtmlPreview from '../components/html-preview/index.vue';
import { storeGlobal } from '../store/global';
import { runtime } from '../runtime/common';

const state = reactive<{
  source: string | null,
}>({
  source: null,
})

onMounted(() => {
  if (storeGlobal.entryPath) {
    state.source = runtime(
      toRaw(storeGlobal.entryPath),
      toRaw(storeGlobal.directory)
    )
  }
})

watch(storeGlobal.directory, () => {
  if (storeGlobal.entryPath) {
    state.source = runtime(
      toRaw(storeGlobal.entryPath),
      toRaw(storeGlobal.directory)
    )
  }
})

</script>

<style scoped>
.code-preview-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.code-preview {
  height: 100%;
}
.code-preview-result {
  width: 100%;
}

.code-preview-question {
  display: inline-block;
  width: 360px;
  padding: 20px;
  text-align: left;
  background: #2196f340;
}


</style>
