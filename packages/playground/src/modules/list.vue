<template>
  <div class="iexample-mod-list">
    <file-tree
      :directory="storeGlobal.directory"
      :currentFilePath="storeGlobal.currentFilePath"
    />
  </div>
</template>

<script lang="ts" setup >
import FileTree from '../components/file-tree.vue';
import { storeGlobal } from '../store/global';
</script>

<style lang="less" scoped>
.iexample-mod-list {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>