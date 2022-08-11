<template>
  <!-- <Playground
    :theme="'dark'"
    :currentMarkdown="mdReactNote01"
    :codeDirectory="state.codeDirectory"
    :currentCodeFilePath="state.currentCodeFilePath"
    :entryCodeFilePath="state.entryCodeFilePath"
    :docDirectory="docDirectory"
    :selectedDocFilePath="state.selectedDocFilePath"
    :expandAllDocFiles="true"
    :onSelectDocFile="onSelectDocFile"
  /> -->
  <Playground :theme="'dark'" />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Playground } from '../src';
import type { CodeDirectory } from '@iexample/types';
import { codeDirectory, codeDirectory2, docDirectory } from './data';
import mdReactNote01 from './md/react-note-01.md?raw';

const state = reactive<{
  selectedDocFilePath: string;
  codeDirectory: CodeDirectory;
  currentCodeFilePath: string;
  entryCodeFilePath: string;
}>({
  selectedDocFilePath: 'item-0/item-0-0/item-0-0-1',
  codeDirectory: codeDirectory,
  currentCodeFilePath: './index.html',
  entryCodeFilePath: '/index.html'
});

const onSelectDocFile = (file) => {
  state.selectedDocFilePath = file.path;
  if (file.path === 'item-0/item-0-0/item-0-0-2') {
    state.codeDirectory = codeDirectory2;
    state.currentCodeFilePath = './demo.html';
    state.entryCodeFilePath = '/demo.html';
    // console.log('index state  = ', toRaw(state))
  } else if (file.path === 'item-0/item-0-0/item-0-0-1') {
    (state.codeDirectory = codeDirectory),
      (state.currentCodeFilePath = './index.html');
    state.entryCodeFilePath = '/index.html';
  }
};
</script>
