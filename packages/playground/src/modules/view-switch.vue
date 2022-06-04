<template>
  <div class="iexample-view-switch">
    <div class="view-switch-header">
      switch
    </div>
    <div class="view-switch-content">
      <code-view></code-view>
    </div>
  </div>
</template>

<script lang="ts" setup >
import CodeView from './code-view.vue';
</script>

<style lang="less" scoped>
.iexample-view-switch {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .view-switch-header {
    height: 40px;
    display: flex;
    border-bottom: 1px solid var(--iexample-border-color);
    box-sizing: border-box;
  }

  .view-switch-content {
    display: flex;
    flex: 1;
  }
}
</style>