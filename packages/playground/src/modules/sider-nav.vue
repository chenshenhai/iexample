<template>
  <div class="iexample-mod-sider-nav">
    <div class="mod-sider-nav-btn active">
      <icon-code></icon-code>
    </div>
    <div class="mod-sider-nav-btn">
      <icon-file-markdown></icon-file-markdown>
    </div>
    <div class="mod-sider-nav-btn">
      <icon-menu></icon-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconCode from '@ant-design/icons-vue/CodeSandboxOutlined';
import IconFileMarkdown from '@ant-design/icons-vue/FileMarkdownOutlined';
import IconMenu from '@ant-design/icons-vue/MenuOutlined';
</script>

<style lang="less" scoped>
.iexample-mod-sider-nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  box-sizing: border-box;
  .mod-sider-nav-btn {
    margin: 10px 0;
    display: flex;
    font-size: 24px;
    height: 32px;
    width: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: var(--iexample-font-color-hover);
    }

    &.active {
      color: var(--iexample-font-color-active);
      &:hover {
        color: var(--iexample-font-color-active);
      }
    }
  }
}
</style>
