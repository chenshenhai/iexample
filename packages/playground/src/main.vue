<template>
  <div
    class="iexample-theme iexample-container"
    :class="{
      'iexample-theme-dark': props.theme === 'dark'
    }"
  >
    <ResponsiveLayout :isMobileMode="isMobileMode" :theme="storeGlobal.theme">
      <template #layout-sider>
        <div v-if="isMobileMode" class="iexample-sider-mobile-mask"></div>
        <div
          class="iexample-sider"
          :class="{
            'iexample-sider-for-mobile-mode': isMobileMode
          }"
        >
          <nav class="iexample-sider-nav">Nav</nav>
          <aside class="iexample-sider-menu">
            <LayoutRow :defaultTopHeight="50" :unit="'%'">
              <template #top> Doc List </template>
              <template #bottom> Code Lide </template>
            </LayoutRow>
          </aside>
        </div>
      </template>
      <template #layout-left>
        <div>Code Edit</div>
      </template>
      <template #layout-right>
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

const isMobileMode = ref<boolean>(false);
const miniModeMaxScreenWidth = 750;

const props = defineProps<{
  theme?: PlaygroundTheme;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

function resetMode() {
  if (window.innerWidth <= miniModeMaxScreenWidth) {
    isMobileMode.value = true;
  } else {
    isMobileMode.value = false;
  }
}

onMounted(() => {
  resetMode();
  window.addEventListener(
    'resize',
    throttle(() => {
      resetMode();
    }, 16)
  );
});
</script>

<style scoped lang="less">
@mobile-sider-zindex: 100;
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

  .iexample-sider-mobile-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    right: 100%;
    z-index: @mobile-sider-zindex;
  }

  .iexample-sider {
    width: 100%;
    height: 100%;
    display: flex;
    background: var(--iexample-tool-secondary-bg);

    &.iexample-sider-for-mobile-mode {
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      max-width: 400px;
      min-width: 240px;
      z-index: @mobile-sider-zindex + 1;
    }

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
