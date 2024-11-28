<script lang="ts" setup>
import { useProfileStore } from "~/modules/profile/stores/profile";

const router = useRouter();
const profileStore = useProfileStore();
const activeItemId = ref<number | null>(null);
const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
const imgPath = "/img/ozon.png";
const products = reactive([
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
  {
    id: 1,
    name: "Протеин",
    weight: 13000,
    amount: 45545820,
  },
]);
</script>

<template>
  <div class="flex flex-col w-full h-[360px] bg-dark-charcoal-color">
    <div class="w-full h-[20px] flex items-center bg-white/5">
      <div
        class="w-full h-full flex items-center justify-center border-r border-gray-15-color"
      >
        <p class="text-10-reg text-gray-40-color">Типы товаров</p>
      </div>
      <div
        class="w-full h-full flex items-center justify-center border-r border-gray-15-color"
      >
        <p class="text-10-reg text-gray-40-color">Вес</p>
      </div>
      <div class="w-full h-full flex items-center justify-center">
        <p class="text-10-reg text-gray-40-color">Сумма</p>
      </div>
    </div>
    <div
      v-if="profileStore.indexStoragesLeft"
      class="w-full h-full flex flex-col mb-2 overflow-y-auto"
    >
      <template v-for="(product, key, index) in profileStore.indexStoragesLeft">
        <div
          :class="[index % 2 == 0 ? 'bg-dark-gunmental-color' : '']"
          class="w-full min-h-[20px] flex items-center"
        >
          <div
            class="w-full h-full flex items-center justify-start border-r border-gray-15-color"
          >
            <span class="w-[35px] text-center text-12-semi text-gray-40-color">
              {{ product.id }}
            </span>
            <p class="w-full ml-1 text-10-semi text-gray-75-color">
              {{ product.name }}
            </p>
          </div>
          <div
            class="w-full h-full flex items-center justify-end border-r border-gray-15-color"
          >
            <p
              :class="[
                product.has_warning ? 'text-error-500' : 'text-success-500',
              ]"
              class="text-10-semi pr-2"
            >
              {{ product.weight.toFixed(1) }} гр
            </p>
          </div>
          <div class="w-full h-full flex items-center justify-end">
            <p class="text-10-semi text-gray-75-color pr-2">
              {{ product.amount.toFixed(1) }}
            </p>
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
