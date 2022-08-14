<template>
  <div class="iexample-responsive-container">
    <header class="iexample-responsive-header">
      <IconMenu
        v-if="isMobileMode"
        class="iexample-responsive-header-icon"
        @click="onClickOpenSider"
      />
      <IconDesktop
        v-if="isMobileMode"
        class="iexample-responsive-header-icon"
        @click="onClickOpenPreview"
      />
    </header>
    <main class="iexample-responsive-content">
      <LayoutColumn
        :defaultLeftWidth="defaultSiderWidth"
        :unit="'px'"
        :hideBlock="isMobileMode === true ? 'left' : null"
      >
        <template #left>
          <div
            v-if="isMobileMode && mobileState.openSider"
            @click="onClickCloseSider"
            class="iexample-responsive-sider-mobile-mask"
          ></div>
          <div
            class="iexample-responsive-sider"
            :class="{
              'iexample-responsive-sider-for-mobile-mode': isMobileMode,
              'iexample-responsive-open-status': mobileState.openSider
            }"
          >
            <slot name="layout-sider"></slot>
          </div>
        </template>
        <template #right>
          <LayoutColumn
            :defaultLeftWidth="50"
            :unit="'%'"
            :hideBlock="isMobileMode === true ? 'right' : null"
          >
            <template #left>
              <slot name="layout-center"></slot>
            </template>
            <template #right>
              <div
                v-if="isMobileMode && mobileState.openPreview"
                @click="onClickClosePreview"
                class="iexample-responsive-preview-mobile-mask"
              ></div>
              <div
                class="iexample-responsive-preview"
                :class="{
                  'iexample-responsive-preview-for-mobile-mode': isMobileMode,
                  'iexample-responsive-open-status': mobileState.openPreview
                }"
              >
                <slot name="layout-preview"></slot>
              </div>
            </template>
          </LayoutColumn>
        </template>
      </LayoutColumn>
    </main>
    <footer class="iexample-responsive-footer">Footer</footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import IconMenu from '@ant-design/icons-vue/MenuOutlined';
import IconDesktop from '@ant-design/icons-vue/DesktopOutlined';
import type { PlaygroundTheme } from '../types';
import LayoutColumn from '../components/layout-column.vue';
import { throttle } from '../util/time';

const defaultSiderWidth: number = 260;

const props = defineProps<{
  theme: PlaygroundTheme;
}>();

const mobileState = reactive({
  openSider: false,
  openPreview: false
});

const onClickOpenSider = () => {
  mobileState.openSider = true;
};

const onClickCloseSider = () => {
  mobileState.openSider = false;
};

const onClickOpenPreview = () => {
  mobileState.openPreview = true;
};

const onClickClosePreview = () => {
  mobileState.openPreview = false;
};

const isMobileMode = ref<boolean>(false);
const miniModeMaxScreenWidth = 750;
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
@header-height: 48px;
@header-icon-size: 24px;
@footer-height: 30px;

@mobile-sider-zindex: 100;
@mobile-preview-zindex: 100;

.iexample-responsive-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .iexample-responsive-header {
    display: flex;
    flex-shrink: 0;
    height: @header-height;
    background: var(--iexample-tool-primary-bg);
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;

    .iexample-responsive-header-icon {
      color: var(--iexample-font-color);
      font-size: @header-icon-size;
      cursor: pointer;
    }
  }

  .iexample-responsive-content {
    display: flex;
    flex: 1;
  }

  .iexample-responsive-footer {
    display: flex;
    height: @footer-height;
    background: var(--iexample-tool-primary-bg);
  }

  // sider
  .iexample-responsive-sider {
    width: 100%;
    height: 100%;
    display: flex;
    background: var(--iexample-tool-secondary-bg);

    &.iexample-responsive-sider-for-mobile-mode {
      position: fixed;
      top: 0;
      left: -100%;
      width: 50%;
      max-width: 400px;
      min-width: 240px;
      z-index: @mobile-sider-zindex + 1;
      transition: 800ms;

      &.iexample-responsive-open-status {
        left: 0;
        transition: 400ms;
      }
    }
  }
  .iexample-responsive-sider-mobile-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: @mobile-sider-zindex;
  }

  // preview
  .iexample-responsive-preview {
    width: 100%;
    height: 100%;
    display: flex;
    background: var(--iexample-tool-secondary-bg);

    &.iexample-responsive-preview-for-mobile-mode {
      position: fixed;
      top: 0;
      right: -100%;
      width: 90%;
      max-width: 90%;
      min-width: 300px;
      z-index: @mobile-preview-zindex + 1;
      transition: 800ms;

      &.iexample-responsive-open-status {
        right: 0;
        transition: 400ms;
      }
    }
  }
  .iexample-responsive-preview-mobile-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: @mobile-preview-zindex;
  }
}
</style>
