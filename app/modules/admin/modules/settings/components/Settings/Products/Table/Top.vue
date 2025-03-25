<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";

const { openNewTab } = useTabs();
const route = useRoute();
const adminStore = useAdminStore();
</script>

<template>
  <div
    class="w-full flex-grow h-[40px] bg-dark-gunmental px-2 p-2 flex items-center justify-between"
  >
    <div class="w-full h-full flex-grow flex items-center justify-start">
      <div class="w-auto h-full flex items-center justify-start">
        <div
          class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15"
        >
          <p class="text-16-400 text-gray-40">{{ route.name }}</p>
        </div>
        <IconPlus
          class="text-gray-40 hover:text-primary ml-4"
          @click="openNewTab('settings-product-add', 'Продукт')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
