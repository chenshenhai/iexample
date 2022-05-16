<template>
  <div
    ref="container"
    class="layout-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="left" :style="{ width: state.splitLeft + 'px' }">
      <slot name="left" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="right" :style="{ width: state.splitRight + 'px' }">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, defineProps } from 'vue';
  const props = defineProps({
    defaultLeftWidth: {
      type: Number,
      default: 100
    },
    defaultRightWidth: {
      type: Number,
      default: -1
    },
    onSplitChange: {
      type: Function,
      default: () => {},
    }
  });
  
  const { defaultLeftWidth, defaultRightWidth, onSplitChange } = props;
  const container = ref();

  const state = reactive({
    dragging: false,
    splitLeft: defaultLeftWidth,
    splitRight: defaultRightWidth,
  })

  let startPosition = 0

  function dragStart(e: MouseEvent) {
    state.dragging = true
    startPosition = e.pageX
  }
  function dragMove(e: MouseEvent) {

    if (state.dragging) {
      // if (!(e.pageX > 0 && startPosition > 0)) {
      //   return;
      // }
      const totalSize = container.value.offsetWidth
      if (!(totalSize && totalSize > 0)) {
        return
      }
      const movePosition = e.pageX - startPosition;
      const newLeftSize = state.splitLeft + movePosition;
      startPosition = e.pageX;

      if (newLeftSize < 100 || (totalSize - newLeftSize) < 100) {
        return;
      }
      state.splitLeft = newLeftSize;
      state.splitRight = totalSize - newLeftSize;

      onSplitChange({
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
  .layout-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  .layout-box.dragging {
    cursor: ew-resize;
  }
  .dragging .left,
  .dragging .right {
    pointer-events: none;
  }
  .left {
    display: flex;
    position: relative;
    height: 100%;
    // flex: 1;
  }
  .right {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    // flex: 1;
  }
  .left {
    border-right: 1px solid #ccc;
  }
  .dragger {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    right: -5px;
    width: 10px;
    cursor: ew-resize;
  }
</style>