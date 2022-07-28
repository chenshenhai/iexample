<template>
  <h1 class="title">{{ msg }}</h1>
  <input v-model="msg">
</template>
<script lang="ts" setup >
import { ref } from 'vue'

const msg = ref<string>('Hello World!')
</script>
<style scoped>
.title { color: #666666; }
</style>