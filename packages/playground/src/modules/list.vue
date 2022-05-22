<template>
  <div class="iexample-mod-list">
    <file-tree
      :directory="storeGlobal.directory"
      :currentFilePath="storeGlobal.currentFile?.path || null"
      :onSelect="onSelect"
    />
  </div>
</template>

<script lang="ts" setup >
import { toRaw } from 'vue';
import FileTree from '../components/file-tree.vue';
import { storeGlobal } from '../store/global';

const onSelect = (data: IProjectFile | IProjectFolder) => {
  if (data.type === 'file') {
    storeGlobal.currentFile = toRaw(data)
  }
}

</script>

<style lang="less" scoped>
.iexample-mod-list {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>