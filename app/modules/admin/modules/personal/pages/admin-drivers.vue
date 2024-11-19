<script lang="ts" setup>
useSeoMeta({
  title: "Sport Food | Admin Drivers",
});

definePageMeta({
  middleware: "auth",
  layout: "admin",
  name: "Водители",
});

const route = useRoute();
</script>

<template>
  <div class="w-full h-full overflow-y-hidden">
    <div
      class="w-full h-[40px] bg-dark-gunmental-color px-2 p-2 overflow-x-hidden"
    >
      <div class="flex-grow h-full flex items-center justify-start">
        <div
          class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15-color"
        >
          <p class="text-16-400 text-gray-40-color">{{ route.name }}</p>
        </div>
        <IconPlus class="text-gray-40-color hover:text-primary-color ml-4" />
        <IconTrash03 class="text-gray-40-color hover:text-error-500 ml-4" />
      </div>
    </div>
    <DriversTable />
  </div>
</template>

<style scoped></style>
