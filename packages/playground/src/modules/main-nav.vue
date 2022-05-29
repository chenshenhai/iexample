<template>
  <div class="iexample-header">
    <div class="iexample-header-left">
      Left
    </div>
    <div class="iexample-header-right">
      <span class="switch-theme-btn" @click="onClickSwitchTheme">
        <icon-bulb-outlined v-if="storeGlobal.theme === 'light'" />
        <icon-bulb-filled  v-if="storeGlobal.theme === 'dark'"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconBulbOutlined from '@ant-design/icons-vue/BulbOutlined';
import IconBulbFilled from '@ant-design/icons-vue/BulbFilled';
import { storeGlobal } from '../store/global';

const onClickSwitchTheme = () => {
  if (storeGlobal.theme === 'dark') {
    storeGlobal.theme = 'light';
  } else {
    storeGlobal.theme = 'dark';
  }
}
 
</script>

<style scoped lang="less">
.iexample-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  .iexample-header-left {
    display: flex;
  }
  .iexample-header-right {
    display: flex;

    .switch-theme-btn {
      cursor: pointer;
    }
  }
}
</style>