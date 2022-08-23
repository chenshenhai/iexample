<template>
  <code-editor :value="codeValue" :type="codeType" @change="onChange" />
</template>

<script setup lang="ts">
import CodeEditor from '../components/code-editor.vue';
import { debounce } from '../util/time';
import type { CodeFileType } from '../types';

const codeValue = `
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>Hello World</div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
`;

const codeType: CodeFileType = 'typescript';

const onChange = debounce((code: string) => {
  console.log('change =====', code);
}, 300);
</script>

<style lang="less"></style>
