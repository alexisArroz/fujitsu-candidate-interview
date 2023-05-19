<script setup lang="ts">
import MainLogo from '@/components/atoms/MainLogo.vue'
</script>
<template>
  <div>
    <div class="container header--top">
      <MainLogo />
    </div>
    <nav class="header--nav"></nav>
  </div>
</template>

<style>
.header--top {
  background-color: #ffffff;
  padding: 17.5px 100px;
  max-height: 80px;
  line-height: 0;
}
.header--nav {
  width: 100%;
  padding: 22.5px 0;
  background-color: #186e73;
}
</style>
