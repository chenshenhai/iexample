<template>
  <div
    class="iexample iexample-container"
    :class="{
      'iexample-theme-dark': storeGlobal.theme === 'dark'
    }"
  >
    <header class="iexample-header">Header</header>
    <main class="iexample-content">
      <LayoutColumn
        :defaultLeftWidth="defaultSiderWidth"
        :unit="'px'"
        :hideBlock="isMiniMode === true ? 'left' : null"
      >
        <template #left>
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
        <template #right>
          <LayoutColumn
            :defaultLeftWidth="50"
            :unit="'%'"
            :hideBlock="isMiniMode === true ? 'right' : null"
          >
            <template #left> Code </template>
            <template #right>
              <LayoutRow :defaultTopHeight="50" :unit="'%'">
                <template #top> Preview </template>
                <template #bottom> Console </template>
              </LayoutRow>
            </template>
          </LayoutColumn>
        </template>
      </LayoutColumn>
    </main>
    <footer class="iexample-footer">Footer</footer>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, onMounted, ref } from 'vue';
import { storeGlobal } from './store/global';
import type { PlaygroundTheme } from './types';
import LayoutColumn from './components/layout-column.vue';
import LayoutRow from './components/layout-row.vue';
import { throttle } from './util/time';

const defaultSiderWidth: number = 260;
const isMiniMode = ref<boolean>(false);
const miniModeMaxScreenWidth = 750;

const props = defineProps<{
  theme?: PlaygroundTheme;
}>();

storeGlobal.theme = props.theme === 'dark' ? 'dark' : 'light';

function resetMode() {
  if (window.innerWidth <= miniModeMaxScreenWidth) {
    isMiniMode.value = true;
  } else {
    isMiniMode.value = false;
  }
}

watchEffect(() => {
  // refreshStoreCode();
  // refreshStoreDoc();
});

onMounted(() => {
  resetMode();
  window.addEventListener(
    'resize',
    throttle(() => {
      resetMode();
      console.log('isMiniMode.value ====', isMiniMode.value);
    }, 16)
  );
});
</script>

<style scoped lang="less">
@container-height: 100vh;
@header-height: 48px;
@footer-height: 30px;

@sider-nav-width: 40px;

.iexample {
  --iexample-bg: #ffffff;
  --iexample-bg-active: #2196f34f;
  --iexample-bg-hover: #e6e6e6;
  --iexample-border-color-active: #2f9df491;

  --iexample-tool-bg: #fcfcfc;

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

    --iexample-tool-bg: #303238;

    --iexample-font-color: #aaaaaa;
    --iexample-font-color-hover: #fafafa;
    --iexample-border-color: #383838;
  }

  color: var(--iexample-font-color);
  height: @container-height;
  display: flex;
  flex-direction: column;

  .iexample-header {
    display: flex;
    flex-shrink: 0;
    height: @header-height;
    background: var(--iexample-tool-bg);
  }

  .iexample-content {
    display: flex;
    flex: 1;
  }

  .iexample-footer {
    display: flex;
    height: @footer-height;
    background: var(--iexample-tool-bg);
  }

  .iexample-sider {
    width: 100%;
    height: 100%;
    display: flex;

    .iexample-sider-nav {
      display: flex;
      background: var(--iexample-tool-bg);
      width: @sider-nav-width;
    }

    .iexample-sider-menu {
      flex: 1;
    }
  }
}
</style>
