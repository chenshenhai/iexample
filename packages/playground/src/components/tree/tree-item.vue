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
      {{itemData.text}}
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
import { TreeData } from './types';

export default {
  name: 'tree-item',
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
      return this.itemData.children && this.itemData.children.length
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
  &:hover {
    background: var(--iexample-bg-active)
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
    padding-left: 12px;
  }
}
</style>