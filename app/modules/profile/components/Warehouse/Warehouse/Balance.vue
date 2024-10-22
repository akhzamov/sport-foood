<script lang="ts" setup>
import { warehouseBalance } from "~/modules/profile/components/Warehouse/Warehouse/warehouseBalance.data";
import type { IWarehouseBalanceCitiesProducts } from "~/modules/profile/types/Warehouse/balance.type";

const activeWareHouseMenu = ref(1);
const warehouseMenuList = reactive([
  { id: 1, title: "Розничное хранилище" },
  { id: 2, title: "Резервное хранилище" },
  { id: 3, title: "Транзитное хранилище" },
]);
const activeWarehouseHoverMenuId = ref<null | number>(null);
const activeWarehouseHoverMenuProduct = ref<string>("");
const activeWarehouseHoverMenuCity = ref<string>("");

const getFilledWidth = (product: IWarehouseBalanceCitiesProducts) => {
  const weight = product.weight; // Предполагаем, что weight - это текущее значение
  const minWeight = product.minWeight;
  const maxWeight = product.maxWeight;

  if (weight < minWeight) {
    return (weight / minWeight) * 15; // Заполнение до минимума
  } else if (weight >= minWeight && weight < maxWeight) {
    const range = maxWeight - minWeight;
    const adjustedWeight = weight - minWeight; // Вычитаем minWeight, чтобы отсчет начался от 0
    return 15 + (adjustedWeight / range) * 70;
  } else {
    const overMaxWeight = weight - maxWeight;
    const maxRange = maxWeight * 0.2; // Диапазон, при котором заполнение идет от 85% до 100%
    return 85 + Math.min((overMaxWeight / maxRange) * 15, 15); // Максимум 100%
  }
};
const getWeightColor = (product: IWarehouseBalanceCitiesProducts) => {
  const weight = product.weight;
  const minWeight = product.minWeight;
  const maxWeight = product.maxWeight;

  if (weight < minWeight) {
    return "bg-error-500"; // Красный цвет
  } else if (weight >= minWeight && weight < maxWeight) {
    return "bg-secondary-color"; // Зеленый цвет
  } else {
    return "bg-primary-color"; // Желтый цвет
  }
};
const handleActiveWareHouseHover = (
  productId: null | number,
  productKey: string,
  city: string
) => {
  activeWarehouseHoverMenuId.value = productId;
  activeWarehouseHoverMenuProduct.value = productKey;
  activeWarehouseHoverMenuCity.value = city;
};
</script>

<template>
  <div class="flex flex-col items-start rounded-lg w-full h-full">
    <div
      class="w-full h-[38px] bg-transparent flex items-center justify-start rounded-t-lg"
    >
      <template v-for="menuItem in warehouseMenuList" :key="menuItem.id">
        <div
          class="w-[220px] cursor-pointer h-[38px] relative flex items-center justify-start px-4 py-2"
          :class="[
            menuItem.id != activeWareHouseMenu ? '' : 'z-[30]',
            menuItem.id != activeWareHouseMenu && menuItem.id % 2 !== 0
              ? 'z-[10]'
              : '',
            menuItem.id != activeWareHouseMenu && menuItem.id % 2 !== 1
              ? 'z-[20]'
              : '',
            menuItem.id != 1 ? 'ml-[-15px]' : '',
          ]"
          @click="activeWareHouseMenu = menuItem.id"
        >
          <p class="w-[100%] text-14-reg text-gray-90-color z-[10]">
            {{ menuItem.title }}
          </p>
          <IconDisableWarehouseMenu
            class="absolute z-[1] top-0 left-0"
            :class="[menuItem.id != activeWareHouseMenu ? 'z-[1]' : 'z-[0]']"
          />
          <IconActiveWarehouseMenu
            class="absolute z-[0] top-0 left-0"
            :class="[menuItem.id != activeWareHouseMenu ? 'z-[0]' : 'z-[1]']"
          />
        </div>
      </template>
    </div>
    <div class="w-full border-t border-gray-15-color">
      <div class="w-full z-[40]">
        <table class="w-full text-sm table-fixed">
          <thead class="flex">
            <tr class="w-full flex">
              <th
                scope="col"
                class="flex-grow h-[36px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-x border-gray-15-color"
              >
                <p class="text-12-semi text-white">Города</p>
              </th>
              <th
                scope="col"
                class="w-[84px] h-[36px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
                v-for="(item, key) in warehouseBalance.products"
                :key="item.id"
              >
                <p class="text-8-reg text-white">{{ key }}</p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-15-color rounded-b-lg flex flex-col">
            <template
              v-for="(city, key, index) in warehouseBalance.cities"
              :key="index"
            >
              <tr
                class="w-full h-7 flex"
                :class="[
                  { 'bg-gray-15-color': index % 2 == 1 },
                  {
                    'rounded-b-lg':
                      index === Object.keys(warehouseBalance.cities).length - 1,
                  },
                ]"
              >
                <th
                  scope="row"
                  class="flex-grow h-full flex items-center justify-start pl-2 border-r border-gray-15-color"
                >
                  <p class="text-10-reg text-white">{{ key }}</p>
                </th>
                <th
                  scope="row"
                  class="w-[84px] h-full flex items-center justify-center border-gray-15-color relative"
                  v-for="(product, productKey) in city.products"
                  @mouseenter="
                    handleActiveWareHouseHover(product.id, productKey, key)
                  "
                  @mouseleave="handleActiveWareHouseHover(null, '', '')"
                >
                  <div
                    class="relative w-[70px] h-[15px] rounded-lg block bg-gray-40-color"
                  >
                    <!-- Минимум -->
                    <div
                      class="w-[4px] h-[17px] absolute z-[10] top-[50%] left-[15%] bg-error-500 translate-y-[-50%] rounded-[2px]"
                    ></div>
                    <!-- Максимум -->
                    <div
                      class="w-[4px] h-[17px] absolute z-[10] top-[50%] right-[15%] bg-malachite translate-y-[-50%] rounded-[2px]"
                    ></div>
                    <!-- Заполненная полоса для веса -->
                    <div
                      class="absolute left-0 top-0 h-full rounded-l-lg"
                      :class="[
                        {
                          'rounded-r-lg': getFilledWidth(product) >= 90,
                        },
                        getWeightColor(product),
                      ]"
                      :style="{
                        width: getFilledWidth(product) + '%',
                      }"
                    ></div>
                  </div>
                  <div
                    class="absolute top-[100%] left-[-10%] z-[30] w-[190px] h-auto translate-y-[10%] rounded-md bg-dark-gunmental-color border border-gray-15-color p-3 flex flex-col items-start justify-center"
                    v-if="
                      product.id == activeWarehouseHoverMenuId &&
                      productKey == activeWarehouseHoverMenuProduct &&
                      key == activeWarehouseHoverMenuCity
                    "
                  >
                    <h4 class="w-full text-12-reg text-gray-90-color text-left">
                      {{ activeWarehouseHoverMenuCity }}
                      <span class="text-10-ext text-primary-color">
                        {{ activeWarehouseHoverMenuProduct }}
                      </span>
                    </h4>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-gray-75-color">Остаток</span>
                      <span class="text-8-reg text-gray-90-color">{{ product.weight.toLocaleString() }} кг</span>
                    </p>
                    <div class="w-full h-[1px] inline-flex bg-dark-charcoal-color my-1"></div>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-error-500">Минимальный запас</span>
                      <span class="text-8-reg text-gray-90-color">{{ product.minWeight.toLocaleString() }} кг</span>
                    </p>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-success-500">Максимальный запас</span>
                      <span class="text-8-reg text-gray-90-color">{{ product.maxWeight.toLocaleString() }} кг</span>
                    </p>
                  </div>
                </th>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
