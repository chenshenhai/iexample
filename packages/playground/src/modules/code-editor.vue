<template>
  <div class="iexample-code-editor" ref="refMount"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CodeMirror from '../util/codemirror';

const refMount = ref<HTMLDivElement>();
const refEditor = ref<CodeMirror.Editor>();

const codeValue = `
var a = 1;
var b = 2;
var c = a + b;
console.log(c);
`

onMounted(() => {
  if (!refMount.value) {
    return;
  }
  const editor: CodeMirror.Editor = CodeMirror(refMount.value, {
    value: codeValue,
    mode: 'javascript',
    readOnly: false,
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
  });
  refEditor.value = editor;
})

</script>

<style lang="less">
.iexample-code-editor {

  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

}

</style>