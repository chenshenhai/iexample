<template>
  <li class="tree-item-node">
    <input
      :style="{ display: 'none' }"
      type="radio"
      :id="itemData.path"
      :value="itemData.path"
    />
    <div
      class="tree-item-text"
      :class="{
        active: !isFolder && selectedFilePath === itemData.path
      }"
      @click="toggle"
    >
      <icon-down
        v-if="isFolder && expand"
        class="tree-item-icon"
        :style="{ fontSize: 12 }"
      />
      <icon-right
        v-else-if="isFolder && !expand"
        class="tree-item-icon"
        :style="{ fontSize: 12 }"
      />
      <icon-file v-else class="tree-item-icon" />
      <span>
        {{ itemData.name }}
      </span>
    </div>
    <ul class="tree-item-view" v-show="expand" v-if="isFolder">
      <tree-item
        v-for="child in itemData.children"
        :key="child.path"
        :itemData="child"
        :expandAll="expandAll"
        :selectedFilePath="selectedFilePath"
        @select="select"
        @expandTree="expandTree"
      >
      </tree-item>
    </ul>
  </li>
</template>

<script lang="ts">
// @ts-nocheck
import IconDown from '@ant-design/icons-vue/DownOutlined';
import IconRight from '@ant-design/icons-vue/RightOutlined';
import IconFile from '@ant-design/icons-vue/FileOutlined';
import type { TreeData } from './types';

export default {
  name: 'tree-item',
  components: {
    'icon-down': IconDown,
    'icon-right': IconRight,
    'icon-file': IconFile
  },
  props: {
    itemData: {
      type: Object as unknown as TreeData,
      required: false
    },
    expandAll: {
      type: Boolean,
      required: false
    },
    selectedFilePath: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      expand: false,
      checked: null
    };
  },
  computed: {
    isFolder() {
      return this.itemData.children && this.itemData.children.length > 0;
    }
  },
  methods: {
    select(node: any) {
      this.checked = null;
      this.checked = this.itemData.path;
      this.$emit('select', node);
    },
    expandTree(node) {
      this.expand = true;
      this.$emit('expandTree', node);
    },
    toggle() {
      if (this.isFolder) {
        this.expand = !this.expand;
      }
      this.select(this.itemData);
    }
  },
  created() {
    this.expand = this.expandAll;
  },
  watch: {
    expandAll(expandAll) {
      this.expand = expandAll;
    }
  }
};
</script>

<style scoped lang="less">
.tree-item-text {
  cursor: pointer;
  user-select: none;
  height: 26px;
  line-height: 26px;
  &:hover {
    background: var(--iexample-bg-hover);
  }

  &.active {
    background: var(--iexample-bg-active);
    border: 1px solid var(--iexample-border-color-active);
  }

  .tree-item-icon {
    font-size: 14px;
    display: inline-block;
    width: 14px;
    margin-left: 3px;
    margin-right: 3px;
  }
}
.tree-item-view {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  .tree-item-node {
    display: block;
    padding-left: 16px;
  }
}
</style>
