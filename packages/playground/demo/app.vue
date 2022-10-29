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
import { docDirectory } from './data';
import mdReactNote01 from './md/react-note-01.md?raw';
import mdVueNote01 from './md/vue-note-01.md?raw';

function mockDoc(name: string, content: string): string {
  return content.replace(/\$\$Hello_Demo\$\$/gi, name);
}

const state = reactive<{
  // TODO
  docDirectory: DocDirectory;
  currentDocFilePath: string;
  docContent: string;
}>({
  docDirectory: docDirectory,
  currentDocFilePath: '',
  // docContent: mockDoc('Hello World', mdVueNote01)
  docContent: mockDoc('Hello World', mdReactNote01)
});

const onSelectDocFile = (file: DocFile) => {
  state.currentDocFilePath = file?.path || '';
  // state.docContent = mockDoc(file.name, mdReactNote01);
  state.docContent = mockDoc(file.name, mdVueNote01);
};
</script>
