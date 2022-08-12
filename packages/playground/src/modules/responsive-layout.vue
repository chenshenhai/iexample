<template>
  <div class="iexample-responsive-container">
    <header class="iexample-responsive-header">
      <IconMenu class="iexample-responsive-header-icon" />
    </header>
    <main class="iexample-responsive-content">
      <LayoutColumn
        :defaultLeftWidth="defaultSiderWidth"
        :unit="'px'"
        :hideBlock="props.isMobileMode === true ? 'left' : null"
      >
        <template #left>
          <slot name="layout-sider"></slot>
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
import IconMenu from '@ant-design/icons-vue/MenuOutlined';
import type { PlaygroundTheme } from '../types';
import LayoutColumn from '../components/layout-column.vue';

const defaultSiderWidth: number = 260;

const props = defineProps<{
  theme: PlaygroundTheme;
  isMobileMode: boolean;
}>();
</script>

<style scoped lang="less">
@header-height: 48px;
@header-icon-size: 24px;
@footer-height: 30px;

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
}
</style>
