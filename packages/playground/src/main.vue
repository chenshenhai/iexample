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
          <nav class="iexample-sider-nav">Nav</nav>
          <aside class="iexample-sider-menu">
            <LayoutRow :defaultTopHeight="50" :unit="'%'">
              <template #top> Doc List </template>
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
import { onMounted, ref } from 'vue';
import ResponsiveLayout from './modules/responsive-layout.vue';
import LayoutRow from './components/layout-row.vue';

import { storeGlobal } from './store/global';
import type { PlaygroundTheme } from './types';
import { throttle } from './util/time';

const props = defineProps<{
  theme?: PlaygroundTheme;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';
</script>

<style scoped lang="less">
@sider-nav-width: 50px;

.iexample-theme {
  --iexample-bg: #ffffff;
  --iexample-bg-active: #2196f34f;
  --iexample-bg-hover: #e6e6e6;
  --iexample-border-color-active: #2f9df491;

  --iexample-tool-primary-bg: #fcfcfc;
  --iexample-tool-secondary-bg: #232528;

  --iexample-font-color: #555555;
  --iexample-font-color-hover: #222222;
  --iexample-font-color-active: #1277f2;

  --iexample-font-family: Monaco, Consolas, monospace, 'Courier New';
  --iexample-border-color: #dddddd;

  &.iexample-theme-dark {
    --iexample-bg: #1a1a1a;
    // --iexample-bg-active: #3e3e3e;
    // --iexample-bg-active: #2196f34f;
    --iexample-bg-hover: #3e3e3e;

    --iexample-tool-primary-bg: #303238;

    --iexample-font-color: #aaaaaa;
    --iexample-font-color-hover: #fafafa;
    --iexample-border-color: #383838;
  }
}

.iexample-container {
  font-family: var(--iexample-font-family);
  color: var(--iexample-font-color);
  background: var(--iexample-bg);

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
