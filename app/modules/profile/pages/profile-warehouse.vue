<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Profile Report",
});

definePageMeta({
  middleware: "auth",
  layout: "profile",
});
</script>

<template>
  <div class="container-custom">
    <Warehouse />
  </div>
</template>

<style scoped></style>
