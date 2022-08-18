<template>
  <div class="iexample-main-view-switch">
    <div class="view-switch-header">
      <div>Left</div>
      <div class="view-switch-tablist">
        <div
          v-for="(item, index) in tabs"
          v-bind:key="index"
          class="view-switch-tab"
          :class="{ active: item.key === state.activeTabKey }"
          @click="onSwicth(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div>Right</div>
    </div>
    <div class="view-switch-content">
      <div v-if="state.activeTabKey === 'demo'">
        <ViewCode />
      </div>
      <div v-else>Markdown</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import ViewCode from './view-code.vue';
const tabs = [
  {
    name: 'Demo',
    key: 'demo'
  },
  {
    name: 'Markdown',
    key: 'markdown'
  }
];

const state = reactive<{
  activeTabKey: string;
}>({
  activeTabKey: tabs[0].key
});

const onSwicth = (key: string) => {
  console.log('key ===', key);
  state.activeTabKey = key;
};
</script>

<style lang="less" scoped>
.iexample-main-view-switch {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .view-switch-header {
    height: 36px;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 1px solid var(--iexample-border-color);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .view-switch-content {
    display: flex;
    flex: 1;
  }

  .view-switch-tablist {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--iexample-border-color-active);
    border-radius: 14px;
    overflow: hidden;
  }

  .view-switch-tab {
    display: flex;
    height: 24px;
    padding: 0 20px;
    min-width: 120px;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--iexample-border-color-active);
    cursor: pointer;

    &.active {
      background: var(--iexample-bg-active);
    }

    &:last-child {
      border-right: none;
    }
  }
}
</style>
