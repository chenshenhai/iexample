<template>
  <Playground
    :theme="'dark'"
    :docDirectory="state.docDirectory"
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

  // codeDirectory: CodeDirectory;
  // entryCodeFilePath: string;
}>({
  docDirectory: docDirectory,
  currentDocFilePath: ''

  // codeDirectory: codeDirectory,
  // currentCodeFilePath: './index.html',
  // entryCodeFilePath: '/index.html'
});

const onSelectDocFile = (file: DocFile) => {
  state.currentDocFilePath = file?.path || '';
};
</script>
