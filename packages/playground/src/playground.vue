<template>
  <div class="page">
    <Header class="page-header"></Header>
    <div class="page-main">
      <div class="page-main-container">
       <CodeView />
      </div>
    </div>
    <Footer class="page-footer"></Footer>
  </div>
</template>

<script lang="ts" setup>
import Header from './modules/header.vue';
import Footer from './modules/footer.vue';
import CodeView from './modules/code.vue';

</script>

<style scoped lang="less">
@header-height: 40px;
@footer-height: 30px;

.page {
  height: 100%;
  background: #f0f0f0f0;
}

.page-header {
  position: fixed;
  top: 0;
  z-index: 100;
  height: @header-height;
  width: 100%;
  box-shadow: 0px 0px 10px 0px #8481817a;
  background: #ffffff;
}
.page-footer {
  bottom: 0;
  position: fixed;
  z-index: 100;
  height: @footer-height;
  width: 100%;
  box-shadow: 0px 0px 10px 0px #8481817a;
  background: #ffffff;
}
.page-main {
  padding-top: @header-height;
  padding-bottom: @footer-height;
  box-sizing: border-box;
  height: 100%;
}

.page-main-container {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>

