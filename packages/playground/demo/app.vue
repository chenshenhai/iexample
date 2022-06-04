<template>
  <Playground
    :theme="'dark'"

    :codeDirectory="codeDirectory"
    :currentCodeFilePath=" './index.html' "
    :entryCodeFilePath=" '/index.html' "

    :docDirectory="docDirectory"
    :selectedDocFilePath="state.selectedDocFilePath"
    :expandAllDocFiles="true"
    :onSelectDocFile="onSelectDocFile"
  />
</template>

<script lang="ts" setup >
import { reactive } from 'vue';
import Playground from '../src';
import { codeDirectory, docDirectory } from './data';

const state = reactive<{
  selectedDocFilePath: string,
}>({
  selectedDocFilePath: 'item-0/item-0-0/item-0-0-1'
})


const onSelectDocFile = (file) => {
  state.selectedDocFilePath = file.path
}

</script>