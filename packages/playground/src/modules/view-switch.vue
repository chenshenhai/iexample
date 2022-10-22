<template>
  <div class="iexample-main-view-switch">
    <div class="view-switch-header">
      <div></div>
      <!-- <div>Left</div> -->
      <div class="view-switch-tablist">
        <div
          v-for="(item, index) in tabs"
          v-bind:key="index"
          class="view-switch-tab"
          :class="{ active: item.key === sharedStore?.docMode }"
          @click="onSwicth(item.key)"
        >
          {{ item.name }}
        </div>
      </div>
      <div></div>
      <!-- <div>Right</div> -->
    </div>
    <div class="view-switch-content">
      <ViewCode
        v-if="sharedStore?.docMode === 'code'"
        :codeContent="props.codeContent"
        :codeType="props.codeType"
      />
      <ViewDoc v-else :content="props.docContent || ''" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import ViewCode from './view-code.vue';
import ViewDoc from './view-doc.vue';
import { SHARED_STORE_CONTEXT_KEY } from '../util/constant';
import type { CodeType, SharedStore, DocMode } from '../types';

const props = defineProps<{
  docContent?: string;
  codeContent?: string;
  codeType?: CodeType;
}>();

const sharedStore: SharedStore | undefined = inject<SharedStore>(
  SHARED_STORE_CONTEXT_KEY
);

const tabs: { name: string; key: DocMode }[] = [
  {
    name: 'Code',
    key: 'code'
  },
  {
    name: 'Document',
    key: 'markdown'
  }
];

const onSwicth = (key: DocMode) => {
  // state.activeTabKey = key;
  if (sharedStore) {
    sharedStore.docMode = key;
  }
};
</script>

<style lang="less" scoped>
@switch-header-height: 36px;

.iexample-main-view-switch {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .view-switch-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: @switch-header-height;
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
    position: absolute;
    top: @switch-header-height;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
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
