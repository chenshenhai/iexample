<template>
  <Playground
    :theme="'dark'"
    :docDirectory="state.docDirectory"
    :docContent="state.docContent"
    :currentDocFilePath="state.currentDocFilePath"
    @onSelectDocFile="onSelectDocFile"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Playground } from '../src';
import type { CodeDirectory, DocDirectory, DocFile } from '@iexample/types';
import { codeDirectory, codeDirectory2, docDirectory } from './data';
import mdReactNote01 from './md/react-note-01.md?raw';

const state = reactive<{
  // TODO
  docDirectory: DocDirectory;
  currentDocFilePath: string;
  docContent: string;
}>({
  docDirectory: docDirectory,
  currentDocFilePath: '',
  docContent: mdReactNote01
});

const onSelectDocFile = (file: DocFile) => {
  state.currentDocFilePath = file?.path || '';

  state.docContent = `# ${file.name}
${mdReactNote01}
`;
};
</script>
