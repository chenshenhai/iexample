<template>
  <div class="iexample-file-tree">
    <div class="iexample-file-item">
      <icon-file class="iexample-file-icon" />
      <span class="iexample-file-name">
        <span class="iexample-file-name-text">index.js</span>
      </span>
    </div>
    <div class="iexample-file-item">
      <icon-file class="iexample-file-icon"/>
      <span class="iexample-file-name">
         <span class="iexample-file-name-text">
          index.css
         </span>
      </span>
    </div>
     <div class="iexample-file-item">
      <icon-file class="iexample-file-icon"/>
      <span class="iexample-file-name">
        <span class="iexample-file-name-text">index11111111111111111111111111111.html</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconFile from '@ant-design/icons-vue/FileOutlined'

</script>

<style lang="less" scoped>
.iexample-file-tree {
  display: flex;
  flex-direction: column;
  width: 100%;

  .iexample-file-item {
    display: flex;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    flex-direction: row;
  }

  .iexample-file-icon {
    display: flex;
    align-items: center; 
    width: 28px;
    justify-content: center;
  }

  .iexample-file-name {
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
    flex: 1;
    padding-right: 4px;
    box-sizing: border-box;
  }

  .iexample-file-name-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: auto;
  }
}
</style>