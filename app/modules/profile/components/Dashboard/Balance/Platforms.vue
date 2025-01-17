<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const router = useRouter();
const profileStore = useProfileStore();
const activeItemId = ref<number | null>(null);
const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
const imgPath = "/img/ozon.png";
</script>

<template>
  <div class="flex flex-col w-full h-[360px] bg-dark-gunmental-color">
    <div
      class="w-full h-[20px] flex items-center px-[20px] bg-dark-charcoal-color"
    >
      <p class="flex-grow text-10-reg text-white">Торговые площадки</p>
      <p class="w-[80px] text-10-ext text-gray-75-color text-end">Вес</p>
      <p class="w-[80px] ml-3 text-10-ext text-gray-75-color text-end">Сумма</p>
    </div>
    <div
      v-if="profileStore.indexMarketplacesLeft"
      class="w-full h-full flex flex-col mb-2 overflow-y-auto"
    >
      <template
        v-for="(item, key) in profileStore.indexMarketplacesLeft"
        :key="item.id"
      >
        <div
          :class="[key % 2 == 0 ? 'bg-dark-charcoal-color' : '']"
          class="relative w-full min-h-[40px] max-h-[40px] h-full flex items-center pr-[20px]"
          @mouseenter="activeItemId = item.id"
          @mouseleave="activeItemId = null"
        >
          <div class="flex-grow flex items-center z-[1]">
            <span class="w-4 h-4 text-center text-12-semi text-gray-40-color">
              {{ item.id }}
            </span>
            <img
              :src="imgPath"
              alt=""
              class="w-6 h-6 rounded-[50%] object-cover ml-1"
            />
            <span class="text-10-semi text-gray-90-color ml-1">
              {{ item.name }}
            </span>
          </div>
          <div class="w-[80px] flex items-center justify-end z-[1]">
            <span class="text-10-semi text-gray-75-color">
              {{ Number(item.weight.toFixed(1)).toLocaleString("ru-RU") }} гр
            </span>
          </div>
          <div class="w-[80px] flex items-center justify-end z-[1]">
            <span class="text-10-semi text-gray-75-color">
              {{ Number(item.amount.toFixed(1)).toLocaleString("ru-RU") }}
            </span>
          </div>
          <div
            v-if="item.has_warning"
            class="w-[80px] h-[16px] absolute top-[50%] left-[35%] z-[1] translate-y-[-50%] flex items-center justify-center gap-1 bg-red-500/25 rounded-md"
          >
            <span class="block w-[5px] h-[5px] rounded-[50%] bg-error-500">
            </span>
            <span class="text-10-ext text-error-500"> Мало товара </span>
          </div>
          <div
            v-if="item.products && item.id == activeItemId"
            class="w-[155px] h-max absolute top-[50%] left-[35%] z-[5] translate-y-[-50%] flex flex-col items-center justify-center gap-1 p-3 bg-dark-gunmental-color rounded-lg border border-gray-15-color"
          >
            <div class="w-full flex items-center justify-between">
              <span class="text-8-reg text-gray-90-color">Продукт</span>
              <span class="text-[7px] font-extralight text-white">
                Остаток
              </span>
            </div>
            <div class="w-full h-[1px] block bg-dark-charcoal-color my-2"></div>
            <div
              class="w-full flex items-center justify-between"
              v-for="product in item.products"
            >
              <span class="text-8-reg text-gray-90-color">
                {{ product.product_name }}
              </span>
              <span class="text-[7px] font-extralight text-white">
                {{ product.weight.toLocaleString() }} гр
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-else
      class="w-full h-full flex flex-col items-center justify-center mb-2 overflow-y-auto"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <UiButton
      bg-color="bg-gray-15-color"
      :border="true"
      border-color="bg-gray-15-color"
      hover=""
      :icon="true"
      text="Подробно"
      text-color="text-white"
      @click="handleRouterWarehouse"
    >
      <template v-slot:icon-r>
        <IconArrowUpRight class="text-white" />
      </template>
    </UiButton>
  </div>
</template>

<style scoped></style>
