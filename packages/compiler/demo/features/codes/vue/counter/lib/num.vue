<template>
  <div class="num">{{ props.num }}</div>
</template>

<script setup>
  const props = defineProps({
    num: Number
  });
</script>

<style>
.num {
  font-size: 30px;
}
</style>

