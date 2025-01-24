<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Stores",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Магазины",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    Stores
  </div>
</template>

<style scoped></style>
