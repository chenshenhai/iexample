<template>
  <div class="code-box">
    <div ref="mount" class="code-box-editor"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch, reactive } from 'vue'
import monaco from '../utils/monaco-editor';
const props = defineProps<{
  code: string,
  width: number,
  language: Types.CodeLanguage,
  selectedLines: Types.CodeSelectedLine[],
}>();
const mount = ref();


let editor: monaco.editor.IStandaloneCodeEditor | null = null;
watch(props, () => {
  const modal = editor?.getModel();
  if (modal) {
    monaco.editor.setModelLanguage(modal, props.language)
  }
  editor?.setValue(props.code)
  // let editorWidth = mount?.value?.offsetWidth;
  if (props.width > 0) {
    // editorWidth = props.width;
    editor?.layout({
      width: props.width,
      height: mount?.value?.offsetHeight,
    });
  }
  setEditorSelectedLines();
})

function setEditorSelectedLines() {
  const config: monaco.editor.IModelDeltaDecoration[] | { range: monaco.Range; options: { isWholeLine: boolean; className: string; glyphMarginClassName: string; }; }[] = [];
  props.selectedLines.forEach((line) => {
    config.push({
      range: new monaco.Range(line.start, 1, line.end, 1),
      options: {
        isWholeLine: true,
        className: 'code-content-class',
        glyphMarginClassName: 'code-glyph-margin-class'
      }
    })
  })
  editor?.deltaDecorations(
    [],
    config,
  );
}


onMounted(() => {
  editor = monaco.editor.create(mount.value, {
    value: props.code,
    language: props.language,
    automaticLayout: false,
	  glyphMargin: true
  });
  setEditorSelectedLines();
})


</script>

<style scoped lang="less">
.code-box {
  width: 100%;
  height: 100%;

  .code-box-editor {
    width: 100%;
    height: 100%;
  }
}
</style>
