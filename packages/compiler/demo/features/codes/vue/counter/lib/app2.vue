<template>
  <div class="app">
    <NumComponent :num="num" />
    <button class="btn" @click="click">Add 2</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NumComponent from './num.vue';
import { add } from '../util/add2';
const num = ref(0);
const click = () => {
  num.value = add(num.value);
};
</script>

<style>
.app {
  width: 200px;
  margin: 0 auto;
  padding: 0;
  color: #666666;
  box-shadow: 0px 0px 9px #00000066;
  text-align: center;
}
.btn {
  font-size: 16px;
  padding: 0 10px;
  height: 24px;
  cursor: pointer;
}
</style>
