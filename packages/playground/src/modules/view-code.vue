<template>
  <code-editor
    :value="props.codeContent || ''"
    :type="props.codeType || 'text'"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import CodeEditor from '../components/code-editor.vue';
import { debounce } from '../util/time';
import type { CodeType } from '../types';

const props = defineProps<{
  codeContent?: string;
  codeType?: CodeType;
}>();

const onChange = debounce((code: string) => {
  // TODO
  // console.log('change =====', code);
}, 300);
</script>

<style lang="less"></style>
