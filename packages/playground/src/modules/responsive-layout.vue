<template>
  <div class="iexample-responsive-container">
    <header class="iexample-responsive-header">
      <IconMenu
        class="iexample-responsive-header-icon"
        @click="onClickOpenSider"
      />
    </header>
    <main class="iexample-responsive-content">
      <LayoutColumn
        :defaultLeftWidth="defaultSiderWidth"
        :unit="'px'"
        :hideBlock="props.isMobileMode === true ? 'left' : null"
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
            :hideBlock="props.isMobileMode === true ? 'right' : null"
          >
            <template #left>
              <slot name="layout-left"></slot>
            </template>
            <template #right>
              <slot name="layout-right"></slot>
            </template>
          </LayoutColumn>
        </template>
      </LayoutColumn>
    </main>
    <footer class="iexample-responsive-footer">Footer</footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import IconMenu from '@ant-design/icons-vue/MenuOutlined';
import type { PlaygroundTheme } from '../types';
import LayoutColumn from '../components/layout-column.vue';

const defaultSiderWidth: number = 260;

const props = defineProps<{
  theme: PlaygroundTheme;
  isMobileMode: boolean;
}>();

const mobileState = reactive({
  openSider: false
});

const onClickOpenSider = () => {
  mobileState.openSider = true;
};

const onClickCloseSider = () => {
  mobileState.openSider = false;
};
</script>

<style scoped lang="less">
@header-height: 48px;
@header-icon-size: 24px;
@footer-height: 30px;

@mobile-sider-zindex: 100;

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
}
</style>
