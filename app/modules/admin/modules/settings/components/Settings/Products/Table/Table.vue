<script lang="ts" setup>
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

const { openEditTab } = useTabs();
const localitiesStore = useLocalitiesStore();
const hoverItemId = ref<number | null>(null);
const getImageSrc = (imageUrl: string) => {
  const baseUrl = "https://crm-api.autosale.pw/"; // Укажи свой домен

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl; // Если уже полный URL, оставляем как есть
  }
  return baseUrl + imageUrl; // Если относительный путь, добавляем домен
};
</script>

<template>
  <div class="w-full h-full overflow-auto">
    <SettingsProductsTableTop />
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center justify-center text-12-med text-gray-40 border-b border-gray-40"
        >
          <th class="w-[36px] text-center">№</th>
          <th class="w-[46px] flex items-center justify-start gap-1">
            <span></span>
          </th>
          <th
            class="min-w-[385px] flex-grow flex items-center justify-start gap-1"
          >
            <span>Наименование</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="localitiesStore.products" class="overflow-auto">
        <template v-for="product in localitiesStore.products" :key="product.id">
          <tr
            @click="
              openEditTab(
                product.id,
                `settings-product-edit-${product.id}`,
                'Продукт'
              )
            "
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15 border-b border-gray-40"
          >
            <th
              class="w-[36px] flex items-center justify-center text-14-reg text-gray-75"
            >
              {{ product.id }}
            </th>
            <th
              class="w-[46px] h-[36px] relative flex items-center justify-center gap-1 text-14-reg text-gray-75 rounded"
            >
              <img
                class="w-[28px] h-[28px] rounded-sm"
                :class="hoverItemId == product.id ? 'image-hover' : ''"
                @mouseenter="hoverItemId = product.id"
                @mouseleave="hoverItemId = null"
                :src="getImageSrc(product.image)"
                alt=""
              />
            </th>
            <th
              class="w-[385px] flex items-center justify-start gap-1 text-14-reg text-gray-75"
            >
              {{ product.name }}
            </th>
          </tr>
        </template>
      </tbody>
      <div
        v-if="!localitiesStore.products"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <div class="loader"></div>
      </div>
      <div
        v-if="localitiesStore.products?.length == 0"
        class="w-full h-[600px] flex items-center justify-center"
      >
        <span class="text-16-med text-gray-75">
          Нет данных для отображение
        </span>
      </div>
    </table>
  </div>
</template>

<style scoped>
.image-hover {
  @apply absolute top-0 left-0 translate-y-[-25%] translate-x-[-25%] min-w-[76px] max-w-[76px] h-[76px] z-[20];
}
</style>
