<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Setting Districts",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Районы",
});

onMounted(async () => {});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between pb-[70px]">
    <SettingsDistrictsTable />
  </div>
</template>

<style scoped></style>
