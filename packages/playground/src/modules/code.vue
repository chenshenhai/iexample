<template>
  <div class='view-code'>
    <div class='view-code-sider' :style="{width: leftWidth + 'px'}">
      side
    </div>
    <div class='view-code-main' :style="{width: rightWidth + 'px'}">
      <code-preview></code-preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import CodePreview from './code-preview.vue';

const leftWidth = 100;
const rightWidth = window.innerWidth - leftWidth;

const state = reactive<{
  projectOpenFile: string,
  projectInfo: Types.ProjectInfo,
}>({
  projectInfo: {
    name: '',
    folder: [],
  },
  projectOpenFile: '',
})


 



</script>

<style scoped>
.view-code {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.view-code-sider {
  display: flex;
  /* width: 80px; */
  border-right: 1px solid #ccc;
}

.view-code-main {
  display: flex;
  background: #ffffff;
  /* flex: 1; */
  /* width: 900px; */
}
</style>
