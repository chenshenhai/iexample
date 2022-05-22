<template>
  <div class="code-preview-container">
    <layout-column class="code-preview" 
      :defaultLeftWidth="220" 
      :unit="'px'"
    >
      <template #left>
        <iexample-list />
      </template>
      <template #right>
        <layout-column class="code-preview" 
          :defaultLeftWidth="50" 
          :onSplitChange="onSplitChange"
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
                <div>Top</div>
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
import { reactive } from 'vue';
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import IexampleEditor from './editor.vue';
import IexampleList from './list.vue';

const state = reactive<{
  codeBoxWidth: number,
}>({
  codeBoxWidth: -1,
})

const onSplitChange = (e: { left: number, right: number }) => {
  const { right } = e;
  state.codeBoxWidth = right;
}

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
