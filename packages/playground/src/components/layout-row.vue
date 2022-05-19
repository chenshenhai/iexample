<template>
  <div
    ref="container"
    class="layout-row-box"
    :class="{ dragging: state.dragging }"
    @mousemove="dragMove"
    @mouseup="dragEnd"
    @mouseleave="dragEnd"
  >
    <div class="top" :style="{ height: state.splitTop + unit }">
      <slot name="top" />
      <div class="dragger" @mousedown.prevent="dragStart" />
    </div>
    <div class="bottom" :style="{ height: state.splitBottom + unit }">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, defineProps, onMounted } from 'vue';
  const props = defineProps<{
    defaultTopHeight: number,
    onSplitChange?: (data: {top: number, bottom: number}) => void;
    unit?: 'px' | '%'
  }>();
  
  const { defaultTopHeight = 50, onSplitChange, unit = 'px' } = props;
  const container = ref<HTMLDivElement>();

  const state = reactive({
    dragging: false,
    splitTop: defaultTopHeight,
    splitBottom: -1,
  })

  let startPosition = 0;

  function dragStart(e: MouseEvent) {
    state.dragging = true
    startPosition = e.pageY
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
      if  (unit === '%') {
        state.splitTop = Math.floor(100 * offsetY / rect.height);
        state.splitBottom = 100 - state.splitTop;
      } else {
        state.splitTop = offsetY;
        state.splitBottom = rect.height - offsetY;
      }
      onSplitChange && onSplitChange({
        top: state.splitTop,
        bottom: state.splitBottom
      });
    }
  }
  function dragEnd() {
    state.dragging = false
  }
</script>

<style scoped lang="less">
  .layout-row-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .dragging .top,
    .dragging .bottom {
      pointer-events: none;
    }
    .top {
      display: flex;
      position: relative;
      height: 100%;
      // flex: 1;
    }
    .bottom {
      display: flex;
      position: relative;
      height: 100%;
      width: 100%;
      flex: 1;
    }
    .top {
      border-bottom: 1px solid #ccc;
    }
    .dragger {
      position: absolute;
      z-index: 99;
      left: 0;
      right: 0;
      bottom: -5px;
      height: 10px;
      cursor: ns-resize;
    }
  }
  .layout-row-box.dragging {
    cursor: ew-resize;
  }
 
</style>