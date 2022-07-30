<template>
  <div class="app">
    <NumComponent :num="num" />
    <button class="btn" @click="click">Add</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import NumComponent from './num.vue';
  import { add } from '../util/add';
  const num = ref(0);
  const click = () => {
    num.value = add(num.value);
  }
</script>

<style>
  .app {
    width: 200px;
    margin: 20px auto;
    padding: 10px;
    color: #666666;
    box-shadow: 0px 0px 9px #00000066;
    text-align: center;
  }
  .btn {
    font-size: 20px;
    padding: 0 10px;
    height: 32px;
    cursor: pointer;
  }
</style>

