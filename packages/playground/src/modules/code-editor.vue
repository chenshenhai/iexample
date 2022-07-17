<template>
  <code-editor :value="codeValue" :type="codeType" @change="onChange" />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CodeEditor from "../components/code-editor.vue";
import { storeCode } from "../store/code";
import { debounce } from "../util/time";
import type { CodeFileType } from "../types";

const codeValue = ref<string>(storeCode.currentCodeFile?.content || "");
const codeType = ref<CodeFileType>(
  storeCode.currentCodeFile?.fileType || "plaintext"
);

watch(
  () => [storeCode.currentCodeFile],
  () => {
    codeValue.value = storeCode.currentCodeFile?.content || "";
    codeType.value = storeCode.currentCodeFile?.fileType || "plaintext";
  }
);

const onChange = debounce((code: string) => {
  for (let i = 0; i < storeCode?.codeDirectory?.length; i++) {
    if (
      storeCode?.codeDirectory[i].type === "file" &&
      storeCode?.codeDirectory[i]?.path === storeCode.currentCodeFile?.path
    ) {
      // @ts-ignore
      storeCode.codeDirectory[i].content = code;
      storeCode.currentCodeFile.content = code;
      break;
    }
  }
}, 300);
</script>

<style lang="less"></style>
