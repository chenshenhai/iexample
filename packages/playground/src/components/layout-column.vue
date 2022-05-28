<template>
  <div
    ref="container"
    class="layout-column-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left" 
      :style="{
        width: state.splitLeft + unit,
        overflow: 'auto'
      }"
    >
      <slot name="left" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="right" 
      :style="{
        width: state.splitRight + unit,
        overflow: 'auto' 
      }"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, defineProps, onMounted } from 'vue';
  const props = defineProps<{
    defaultLeftWidth: number,
    onSplitChange?: (data: {left: number, right: number}) => void;
    unit?: 'px' | '%'
  }>();
  
  const { defaultLeftWidth = 50, onSplitChange, unit = 'px' } = props;
  const container = ref<HTMLDivElement>();

  const state = reactive({
    dragging: false,
    splitLeft: defaultLeftWidth,
    splitRight: -1,
  })

  let startPosition = 0;

  function dragStart(e: MouseEvent) {
    state.dragging = true
    startPosition = e.pageX
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
        state.splitLeft = Math.floor(100 * offsetX / rect.width);
        state.splitRight = 100 - state.splitLeft;
      } else {
        state.splitLeft = offsetX;
        state.splitRight = rect.width - offsetX;
      }
      onSplitChange && onSplitChange({
        left: state.splitLeft,
        right: state.splitRight
      })
      
    }
  }
  function dragEnd() {
    state.dragging = false
  }
</script>

<style scoped lang="less">
  .layout-column-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    &.dragging {
      .left, .right {
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

    .left {
      display: flex;
      position: relative;
      height: 100%;
      // flex: 1;
      border-right: 1px solid var(--iexample-border-color);
    }
    .right {
      display: flex;
      position: relative;
      height: 100%;
      width: 100%;
      flex: 1;
    }
    .dragger {
      position: absolute;
      z-index: 99;
      top: 0;
      bottom: 0;
      right: 0;
      width: 10px;
      cursor: ew-resize;
    }
  }
  .layout-column-box.dragging {
    cursor: ew-resize;
  }
 
</style>