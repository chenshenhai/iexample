<template>
  <div class="main-layout-container">
    <layout-column class="main-layout-preview" 
      :defaultLeftWidth="220" 
      :unit="'px'"
    >
      <template #left>
        <layout-row style="{{width: '100%', height: '100%'}}"
          :defaultTopHeight="50"
          :unit="'%'"
        >
          <template #top>
            <doc-list />
          </template>
          <template #bottom>
            <code-list />
          </template>
        </layout-row>
      </template>
      <template #right>
        <code-view />
      </template>
    </layout-column>
  </div>
</template>

<script setup lang="ts" >
import LayoutColumn from '../components/layout-column.vue';
import LayoutRow from '../components/layout-row.vue';
import CodeView from './code-view.vue';
import CodeList from './code-list.vue';
import DocList from './doc-list.vue';
</script>

<style scoped>
.main-layout-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.main-layout-preview {
  height: 100%;
}

</style>
