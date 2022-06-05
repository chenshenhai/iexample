<template>
  <div class="iexample-view-switch">
    <div class="view-switch-header">
      <div>Left</div>
      <div class="view-switch-tablist">
        <div class="view-switch-tab">
          Markdown
        </div>
        <div class="view-switch-tab active">
          Demo
        </div>
      </div>
      <div>Right</div>
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
    height: 28px;
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