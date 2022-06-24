<template>
  <div class="iexample-code-editor" ref="refMount"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import CodeMirror from "../util/codemirror";
import type { CodeType } from "../types";

const refMount = ref<HTMLDivElement>();
const refEditor = ref<CodeMirror.Editor>();
const emit = defineEmits<(e: "change", value: string) => void>();

const modeMap = {
  javascript: "javascript",
  jsx: "jsx",
  typescript: "jsx",
  json: "typescript",
  html: "htmlmixed",
  css: "css",
  plaintext: "markdown",
  markdown: "markdown",
};

const props = defineProps<{
  value: string;
  type: CodeType;
}>();

onMounted(() => {
  if (!refMount.value) {
    return;
  }
  const editor: CodeMirror.Editor = CodeMirror(refMount.value, {
    value: props.value || "",
    mode: modeMap[props.type] || modeMap["plaintext"],
    readOnly: false,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  });
  refEditor.value = editor;

  editor.on("change", () => {
    emit("change", editor.getValue());
  });

  watchEffect(() => {
    editor.setValue(props.value);
  });
  watchEffect(() => {
    const mode = modeMap[props.type] || modeMap["plaintext"];
    editor.setOption("mode", mode);
  });
});
</script>

<style lang="less">
.iexample-code-editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
