<template>
  <div class="iexample-file-tree">
    <div class="iexample-file-item"
      v-for="item in directory"
      :class="{
        'active': state.currentFilePath === item.path
      }"
      @click="onClick(item)"
    >
      <icon-file class="iexample-file-icon"/>
      <span class="iexample-file-name">
         <span class="iexample-file-name-text">
          {{item.name}}
         </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive } from 'vue';
import IconFile from '@ant-design/icons-vue/FileOutlined';

const props = defineProps<{
  directory: CodeDirectory,
  currentFilePath: string | null,
  onSelect?: (data: CodeFile | CodeFolder) => void,
}>();

const { directory = [], currentFilePath, onSelect } = props;

const state = reactive<{
  currentFilePath: string | null,
}>({
  currentFilePath,
})

const onClick = (data: CodeFile | CodeFolder) => {
  onSelect && onSelect(data)
}

watch(props, () => {
  state.currentFilePath = props.currentFilePath
})

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
    cursor: pointer;
    box-sizing: content-box;

    &:hover {
      background: var(--iexample-bg-hover);
    }

    &.active {
      background: var(--iexample-bg-active);
      border: 1px solid var(--iexample-border-color-active);
    }
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