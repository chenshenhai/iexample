<template>
  <div class='view-code'>
    <div class='view-code-sider' :style="{width: leftWidth + 'px'}">
      side
    </div>
    <div class='view-code-main' :style="{width: rightWidth + 'px'}">
      <CodeLayout 
        :width="rightWidth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeLayout from './code-layout.vue';

const leftWidth = 50;
const rightWidth = window.innerWidth - leftWidth;


</script>

<style scoped>
.view-code {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.view-code-sider {
  display: flex;
  /* width: 80px; */
  border-right: 1px solid var(--iexample-border-color);
}

.view-code-main {
  display: flex;
  background: var(--iexample-bg);
  /* flex: 1; */
  /* width: 900px; */
}
</style>
