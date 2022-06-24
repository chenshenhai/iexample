<template>
  <div class="main-view-code">
    <div class="main-view-code-sider" :style="{ width: leftWidth + 'px' }">
      <main-sider />
    </div>
    <div class="main-view-code-main" :style="{ width: rightWidth + 'px' }">
      <main-layout :width="rightWidth" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MainLayout from "./main-layout.vue";
import MainSider from "./main-sider.vue";

const leftWidth = 50;
const rightWidth = window.innerWidth - leftWidth;
</script>

<style scoped lang="less">
.main-view-code {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.main-view-code-sider {
  display: flex;
  /* width: 80px; */
  border-right: 1px solid var(--iexample-border-color);
}

.main-view-code-main {
  display: flex;
  background: var(--iexample-bg);
  /* flex: 1; */
  /* width: 900px; */
}
</style>
