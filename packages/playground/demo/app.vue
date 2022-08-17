<template>
  <Playground
    :theme="'dark'"
    :docDirectory="state.docDirectory"
    @onSelectDocFile="onSelectDocFile"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Playground } from '../src';
import type { CodeDirectory, DocDirectory } from '@iexample/types';
import { codeDirectory, codeDirectory2, docDirectory } from './data';
import mdReactNote01 from './md/react-note-01.md?raw';

const state = reactive<{
  // TODO
  selectedDocFilePath: string;
  codeDirectory: CodeDirectory;
  docDirectory: DocDirectory;
  currentCodeFilePath: string;
  entryCodeFilePath: string;
}>({
  selectedDocFilePath: 'item-0/item-0-0/item-0-0-1',
  codeDirectory: codeDirectory,
  docDirectory: docDirectory,
  currentCodeFilePath: './index.html',
  entryCodeFilePath: '/index.html'
});

const onSelectDocFile = (file) => {
  console.log('file =====', file);
  // state.selectedDocFilePath = file.path;
  // if (file.path === 'item-0/item-0-0/item-0-0-2') {
  //   state.codeDirectory = codeDirectory2;
  //   state.currentCodeFilePath = './demo.html';
  //   state.entryCodeFilePath = '/demo.html';
  //   // console.log('index state  = ', toRaw(state))
  // } else if (file.path === 'item-0/item-0-0/item-0-0-1') {
  //   (state.codeDirectory = codeDirectory),
  //     (state.currentCodeFilePath = './index.html');
  //   state.entryCodeFilePath = '/index.html';
  // }
};
</script>
