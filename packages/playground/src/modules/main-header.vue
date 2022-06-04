<template>
  <div class="iexample-main-header">
    <div class="main-header-left">
      <!-- Left -->
    </div>
    <div class="main-header-center">
      {{storeDoc?.selectedDocFile?.name}}
    </div>
    <div class="main-header-right">
      <span class="switch-theme-btn" @click="onClickSwitchTheme">
        <icon-bulb-outlined v-if="storeGlobal.theme === 'light'" />
        <icon-bulb-filled  v-if="storeGlobal.theme === 'dark'"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import IconBulbOutlined from '@ant-design/icons-vue/BulbOutlined';
import IconBulbFilled from '@ant-design/icons-vue/BulbFilled';
import { storeGlobal } from '../store/global';
import { storeDoc } from '../store/doc';

const onClickSwitchTheme = () => {
  if (storeGlobal.theme === 'dark') {
    storeGlobal.theme = 'light';
  } else {
    storeGlobal.theme = 'dark';
  }
}


</script>

<style scoped lang="less">
.iexample-main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  .main-header-left {
    display: flex;
  }
  .main-header-right {
    display: flex;

    .switch-theme-btn {
      cursor: pointer;
    }
  }
}
</style>