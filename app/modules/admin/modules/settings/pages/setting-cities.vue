<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Cities",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Города",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsCitiesTable />
  </div>
</template>

<style scoped></style>
