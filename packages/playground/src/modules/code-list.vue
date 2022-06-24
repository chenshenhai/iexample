<template>
  <div class="iexample-mod-list">
    <file-tree
      :directory="storeCode.codeDirectory"
      :currentFilePath="storeCode.currentCodeFile?.path || null"
      :onSelect="onSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { toRaw } from "vue";
import FileTree from "../components/tree/file-tree.vue";
import { storeCode } from "../store/code";
import type { CodeFile } from "../types";

const onSelect = (data: CodeFile) => {
  if (data.type === "file") {
    storeCode.currentCodeFile = toRaw(data);
  }
};
</script>

<style lang="less" scoped>
.iexample-mod-list {
  padding: 10px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
