<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Profile Dashboard",
});

definePageMeta({
  middleware: "auth",
  layout: "profile",
});
</script>

<template>
  <div class="container-custom">
    <Dashboard />
  </div>
</template>

<style scoped></style>
