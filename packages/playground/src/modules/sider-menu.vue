<template>
  <div class="iexample-mod-sider-menu">
    <nav class="iexample-sider-nav">
      <SiderNav />
    </nav>
    <aside class="iexample-sider-menu">
      <LayoutRow :defaultTopHeight="50" :unit="'%'">
        <template #top>
          <TreeView
            :data="props.docDirectory || []"
            :expandAll="true"
            :selectedFilePath="props.currentDocFilePath || ''"
            @selectFile="onSelectDocFile"
          />
        </template>
        <template #bottom> Code Lide </template>
      </LayoutRow>
    </aside>
  </div>
</template>

<script setup lang="ts">
import type { DocDirectory, DocFile } from '../types';
import SiderNav from './sider-nav.vue';
import LayoutRow from '../components/layout-row.vue';
import TreeView from '../components/tree/tree-view.vue';
const props = defineProps<{
  docDirectory?: DocDirectory;
  currentDocFilePath?: string;
}>();

const emit = defineEmits<{
  (event: 'onSelectDocFile', value: DocFile): void;
}>();
const onSelectDocFile = (docFile: DocFile) => {
  emit('onSelectDocFile', docFile);
};
</script>

<style lang="less">
@sider-nav-width: 50px;
.iexample-mod-sider-menu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  background: var(--iexample-tool-secondary-bg);
  .iexample-sider-nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    background: var(--iexample-tool-primary-bg);
    width: @sider-nav-width;
  }
  .iexample-sider-menu {
    position: absolute;
    left: @sider-nav-width;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>