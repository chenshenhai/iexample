<template>
  <div
    ref="container"
    class="layout-column-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div
      class="layout-column-left"
      :style="{
        ...(hideBlock === null ? { width: state.splitLeft + unit } : {}),
        ...(props.hideBlock === 'left' ? { width: 0, height: 0 } : {}),
        ...(props.hideBlock === 'right' ? { width: '100%' } : {}),
        overflow: 'auto'
      }"
    >
      <slot name="left" />
      <div
        v-if="props.hideBlock === null"
        class="layout-column-dragger"
        @mousedown.prevent="dragStart"
      />
    </div>
    <div
      class="layout-column-right"
      :style="{
        ...(hideBlock === null ? { width: state.splitRight + unit } : {}),
        ...(props.hideBlock === 'right' ? { width: 0, height: 0 } : {}),
        ...(props.hideBlock === 'left' ? { width: '100%' } : {}),
        overflow: 'auto'
      }"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const props = defineProps<{
  defaultLeftWidth: number;
  onSplitChange?: (data: { left: number; right: number }) => void;
  unit?: 'px' | '%';
  hideBlock: null | 'left' | 'right';
}>();

const { defaultLeftWidth = 50, onSplitChange, unit = 'px' } = props;
const container = ref<HTMLDivElement>();

const state = reactive({
  dragging: false,
  splitLeft: defaultLeftWidth,
  splitRight: -1
});

function dragStart() {
  state.dragging = true;
}
function dragMove(e: MouseEvent) {
  if (state.dragging) {
    const rect = container?.value?.getBoundingClientRect();
    if (!(rect && rect.width > 0)) {
      return;
    }
    const offsetX = e.pageX - rect.left;
    if (!(offsetX > 0 && offsetX < rect.width)) {
      return;
    }
    if (unit === '%') {
      state.splitLeft = Math.floor((100 * offsetX) / rect.width);
      state.splitRight = 100 - state.splitLeft;
    } else {
      state.splitLeft = offsetX;
      state.splitRight = rect.width - offsetX;
    }
    onSplitChange &&
      onSplitChange({
        left: state.splitLeft,
        right: state.splitRight
      });
  }
}
function dragEnd() {
  state.dragging = false;
}
</script>

<style scoped lang="less">
.layout-column-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  &.layout-column-dragging {
    .layout-column-left,
    .layout-column-right {
      pointer-events: none;
      &::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
      }
    }
  }

  .layout-column-left {
    display: flex;
    position: relative;
    height: 100%;
    // flex: 1;
    border-right: 1px solid var(--iexample-border-color);
  }
  .layout-column-right {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    flex: 1;
  }
  .layout-column-dragger {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    right: 0;
    width: 10px;
    cursor: ew-resize;
  }
}
.layout-column-box.layout-column-dragging {
  cursor: ew-resize;
}
</style>
