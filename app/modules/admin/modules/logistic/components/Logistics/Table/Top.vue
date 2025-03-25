<script lang="ts" setup>
const { openNewTab } = useTabs();
const route = useRoute();
</script>

<template>
  <div class="w-full h-[40px] bg-dark-gunmental px-2 p-2 overflow-x-hidden">
    <div class="flex-grow h-full flex items-center justify-start">
      <div
        class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
      >
        <p class="text-16-400 text-gray-40">{{ route.name }}</p>
      </div>
      <IconPlus
        @click="openNewTab('logistics-add', 'Закуп')"
        class="text-gray-40 hover:text-primary ml-4"
      />
    </div>
  </div>
</template>

<style scoped></style>
