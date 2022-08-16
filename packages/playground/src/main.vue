<template>
  <div
    class="iexample-theme iexample-container"
    :class="{
      'iexample-theme-dark': props.theme === 'dark'
    }"
  >
    <ResponsiveLayout :theme="storeGlobal.theme">
      <template #layout-sider>
        <div class="iexample-sider">
          <nav class="iexample-sider-nav">
            <SiderNav />
          </nav>
          <aside class="iexample-sider-menu">
            <LayoutRow :defaultTopHeight="50" :unit="'%'">
              <template #top>
                <tree-view
                  :data="props.docDirectory || []"
                  :expandAll="true"
                  :selectedFilePath="''"
                  @selectFile="() => {}"
                />
              </template>
              <template #bottom> Code Lide </template>
            </LayoutRow>
          </aside>
        </div>
      </template>
      <template #layout-center>
        <div>Code Edit</div>
      </template>
      <template #layout-preview>
        <LayoutRow :defaultTopHeight="50" :unit="'%'">
          <template #top> Preview </template>
          <template #bottom> Console </template>
        </LayoutRow>
      </template>
    </ResponsiveLayout>
  </div>
</template>

<script lang="ts" setup>
import { toRaw } from 'vue';
import type { PlaygroundTheme, DocDirectory } from './types';
import ResponsiveLayout from './modules/responsive-layout.vue';
import SiderNav from './modules/sider-nav.vue';
import LayoutRow from './components/layout-row.vue';
import { storeGlobal } from './store/global';
import TreeView from './components/tree/tree-view.vue';

const props = defineProps<{
  theme?: PlaygroundTheme;

  // TODO
  docDirectory?: DocDirectory;
  currentDocPath?: string;
  currentDocContent?: string;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

console.log('props.codeDirectory =====', props.docDirectory);
console.log('props.codeDirectory =====', toRaw(props.docDirectory));
</script>

<style scoped lang="less">
@sider-nav-width: 50px;
.iexample-container {
  font-family: var(--iexample-font-family);
  color: var(--iexample-font-color);
  background: var(--iexample-bg);

  height: 100vh;
  overflow: auto;

  .iexample-sider {
    width: 100%;
    height: 100%;
    display: flex;
    background: var(--iexample-tool-secondary-bg);
    .iexample-sider-nav {
      display: flex;
      background: var(--iexample-tool-primary-bg);
      width: @sider-nav-width;
    }
    .iexample-sider-menu {
      flex: 1;
    }
  }
}
</style>
