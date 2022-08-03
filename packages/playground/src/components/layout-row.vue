<template>
  <div
    ref="container"
    class="layout-row-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div
      class="top"
      :style="{
        height: state.splitTop + unit,
        overflow: 'auto'
      }"
    >
      <slot name="top" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div
      class="bottom"
      :style="{
        height: state.splitBottom + unit,
        overflow: 'auto'
      }"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const props = defineProps<{
  defaultTopHeight: number;
  onSplitChange?: (data: { top: number; bottom: number }) => void;
  unit?: 'px' | '%';
}>();

const { defaultTopHeight = 50, onSplitChange, unit = 'px' } = props;
const container = ref<HTMLDivElement>();

const state = reactive({
  dragging: false,
  splitTop: defaultTopHeight,
  splitBottom: -1
});

function dragStart(e: MouseEvent) {
  state.dragging = true;
}
function dragMove(e: MouseEvent) {
  if (state.dragging) {
    const rect = container?.value?.getBoundingClientRect();
    if (!(rect && rect.height > 0)) {
      return;
    }
    const offsetY = e.pageY - rect.top;
    if (!(offsetY > 0 && offsetY < rect.height)) {
      return;
    }
    if (unit === '%') {
      state.splitTop = Math.floor((100 * offsetY) / rect.height);
      state.splitBottom = 100 - state.splitTop;
    } else {
      state.splitTop = offsetY;
      state.splitBottom = rect.height - offsetY;
    }
    onSplitChange &&
      onSplitChange({
        top: state.splitTop,
        bottom: state.splitBottom
      });
  }
}
function dragEnd() {
  state.dragging = false;
}
</script>

<style scoped lang="less">
.layout-row-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .top {
    display: flex;
    position: relative;
    height: 100%;
    // flex: 1;
    border-bottom: 1px solid var(--iexample-border-color);
  }

  .bottom {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    flex: 1;
  }

  &.dragging {
    .top,
    .bottom {
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

  .dragger {
    position: absolute;
    z-index: 99;
    left: 0;
    right: 0;
    bottom: 0;
    height: 10px;
    cursor: ns-resize;
  }
}
.layout-row-box.dragging {
  cursor: ns-resize;
}
</style>
