<template>
  <div class="code-preview-container">
    <layout-column class="code-preview" 
      :defaultLeftWidth="220" 
      :unit="'px'"
    >
      <template #left>
        <div>list</div>
      </template>
      <template #right>
        <layout-column class="code-preview" 
          :defaultLeftWidth="50" 
          :onSplitChange="onSplitChange"
          :unit="'%'"
        >
          <template #left class="left">
            <code-editor />
          </template>
          <template #right class="right">
            <layout-row style="{{width: '100%', height: '100%'}}"
              :defaultTopHeight="50" 
              :onSplitChange="onSplitChange"
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
import { reactive, defineProps } from 'vue';
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import CodeEditor from './code-editor.vue';
import Code from './code.vue';

const props = defineProps<{ width: number }>();
const defaultLayoutLeft = props.width / 2;

const state = reactive<{
  codeBoxWidth: number,
  codeLanguage: Types.CodeLanguage,
  codeSelectedLines: Types.CodeSelectedLine[],
  codeContent: string,
  selectedKeys: string[],
  expandedKeys: string[],
}>({
  codeBoxWidth: -1,
  codeLanguage: 'plaintext',
  codeContent: '',
  codeSelectedLines: [],
  selectedKeys: [],
  expandedKeys: ['src'],
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
