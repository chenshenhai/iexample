<template>
  <div
    v-if="props.content"
    v-html="parseMarkdownToHtml(props.content)"
    class="iexmaple-mod-view-doc"
  />
  <div v-else>Not Found</div>
</template>

<script setup lang="ts">
import { parseMarkdownToHtml } from '../runtime/markdown/render';

const props = defineProps<{
  content: string;
}>();
console.log('props ===', props);
</script>

<style lang="less">
@import 'highlight.js/styles/monokai-sublime.css';
.iexmaple-mod-view-doc {
  width: 100%;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;

  > * {
    width: 100%;
    overflow: auto;
  }
  > pre {
    box-sizing: border-box;
    border: 2px solid var(--iexample-border-color);
    border-radius: 10px;
  }
}
</style>
