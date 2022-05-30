<template>
  <li class="tree-item-node" >
    <input 
      :style="{display: 'none'}" 
      type="radio"
      v-model="checked" 
      :id="itemData.id" 
      :value="itemData.id" />        
    <div
      class="tree-item-text" 
      :for="itemData.id" 
      @click="toggle">
      <icon-down v-if="isFolder && expand" class="tree-item-icon" />
      <icon-right v-else-if="isFolder && !expand" class="tree-item-icon" />
      <icon-file v-else class="tree-item-icon" />
      <span>{{itemData.text}}</span>
    </div>
    <ul class="tree-item-view" v-show="expand" v-if="isFolder">
      <tree-item 
        v-for="child in itemData.children" 
        :key="child.id" 
        :itemData="child" 
        :expandAll="expandAll"
        @selected="selected" 
        @expandTree="expandTree"
      >
      </tree-item>      
    </ul>
  </li>
</template>

<script lang="ts">
import IconDown from '@ant-design/icons-vue/DownOutlined';
import IconRight from '@ant-design/icons-vue/RightOutlined';
import IconFile from '@ant-design/icons-vue/FileOutlined'
import { TreeData } from './types';

export default {
  name: 'tree-item',
  components: {
    'icon-down': IconDown,
    'icon-right': IconRight,
    'icon-file': IconFile,
  },
  props: {
    itemData: {
      type: Object as unknown as TreeData,
      required: false
    },
    expandAll: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      expand: false,
      checked: null,
    }
  },
  computed: {
    isFolder() {
      return this.itemData.children && this.itemData.children.length > 0
    },
  },
  methods: {
    selected(node) {
      this.checked = null
      this.checked = this.itemData.id
      this.$emit('selected', node)
    },
    expandTree(node) {
      this.expand = true
      this.$emit('expandTree', node)
    },
    toggle() {
      if (this.isFolder) {
        this.expand = !this.expand
      }
      this.selected(this.itemData)
    }
  },
  created() {
    this.expand = this.expandAll
  },
  watch: {
    expandAll(expandAll) {
      this.expand = expandAll
    }
  }
}
</script>

<style scoped lang="less">
.tree-item-text {
  cursor: pointer;
  user-select: none;
  height: 26px;
  line-height: 26px;
  &:hover {
    background: var(--iexample-bg-active)
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