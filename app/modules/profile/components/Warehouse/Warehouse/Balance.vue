<script lang="ts" setup>
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";
import type { TStoragesLeftProduct } from "~/modules/profile/types/Warehouse/storagesLeft.type";
import { getStoragesLeft } from "~/modules/profile/components/Warehouse/Warehouse/warehouseBalance.data";

const warehouseStore = useWarehouseStore();
const activeWarehouseHoverMenuId = ref<null | number>(null);
const activeWarehouseHoverMenuProduct = ref<string>("");
const activeWarehouseHoverMenuCity = ref<string>("");
const cityModalRightDistance = ref<number | null>(null);
const cityModalBottomDistance = ref<number | null>(null);
const productRef = ref<HTMLElement[]>([]);
const tableRef = ref<HTMLElement | null>(null);
const getFilledWidth = (product: TStoragesLeftProduct) => {
  const weight = Number(product.left); // Предполагаем, что weight - это текущее значение
  const minWeight = product.min_limit;
  const maxWeight = product.max_limit;

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
const getWeightColor = (product: TStoragesLeftProduct) => {
  const weight = Number(product.left);
  const minWeight = product.max_limit;
  const maxWeight = product.max_limit;

  if (weight < minWeight) {
    return "bg-error-500"; // Красный цвет
  } else if (weight >= minWeight && weight < maxWeight) {
    return "bg-secondary-color"; // Зеленый цвет
  } else {
    return "bg-primary-color"; // Желтый цвет
  }
};

const checkPosition = async () => {
  await nextTick();
  if (productRef.value && tableRef.value) {
    productRef.value.forEach((modal, index) => {
      const modalRect = modal?.getBoundingClientRect();
      const tableRect = tableRef.value?.getBoundingClientRect();

      if (tableRect && modalRect) {
        const tableWidth = tableRect.right;
        const tableHeight = tableRect.height;
        const distanceToRightTable = tableWidth - modalRect.right;
        const distanceToBottomTable = tableRect.bottom - modalRect.bottom;
        cityModalRightDistance.value = distanceToRightTable;
        cityModalBottomDistance.value = distanceToBottomTable;
      }
    });
  }
};

const handleActiveWareHouseHover = (
  productId: null | number,
  productName: string,
  cityName: string
) => {
  activeWarehouseHoverMenuId.value = productId;
  activeWarehouseHoverMenuProduct.value = productName;
  activeWarehouseHoverMenuCity.value = cityName;
};

watch(
  () => warehouseStore.activeStorageType,
  async () => {
    await getStoragesLeft();
  }
);
</script>

<template>
  <div
    class="flex flex-col items-start rounded-lg w-full h-full"
    v-if="warehouseStore.storageTypes"
  >
    <div
      class="w-full h-[38px] bg-transparent flex items-center justify-start rounded-t-lg"
    >
      <template
        v-for="(storage, storageKey, index) in warehouseStore.storageTypes"
        :key="storageKey"
      >
        <div
          class="w-[220px] cursor-pointer h-[38px] relative flex items-center justify-start px-4 py-2"
          :class="[
            storageKey === warehouseStore.activeStorageType ? 'z-[30]' : '',
            storageKey !== warehouseStore.activeStorageType && index === 1
              ? 'z-[20]'
              : '',
            storageKey !== warehouseStore.activeStorageType && index === 2
              ? 'z-[10]'
              : '',
            storageKey !== 'RETAIL' ? 'ml-[-15px]' : '',
          ]"
          @click="warehouseStore.activeStorageType = storageKey"
        >
          <p class="w-[100%] text-14-reg text-gray-90-color z-[10]">
            {{ storage }}
          </p>
          <IconDisableWarehouseMenu
            class="absolute z-[1] top-0 left-0"
            :class="[
              storageKey !== warehouseStore.activeStorageType
                ? 'z-[1]'
                : 'z-[0]',
            ]"
          />
          <IconActiveWarehouseMenu
            class="absolute z-[0] top-0 left-0"
            :class="[
              storageKey !== warehouseStore.activeStorageType
                ? 'z-[0]'
                : 'z-[1]',
            ]"
          />
        </div>
      </template>
    </div>
    <div
      class="w-full border-t border-gray-15-color"
      v-if="warehouseStore.storagesLeft"
    >
      <div
        class="w-full z-[40] overflow-x-auto"
        v-if="Object.values(warehouseStore.storagesLeft).length > 0"
      >
        <table class="w-full text-sm table-fixed">
          <thead class="flex">
            <tr class="rw-full flex">
              <th
                scope="col"
                class="min-w-[105px] h-[56px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-x border-gray-15-color"
              >
                <p class="text-12-semi text-white">Города</p>
              </th>
              <template
                v-for="([storageKey, storage], index) in Object.entries(
                  warehouseStore.storagesLeft || {}
                )"
                :key="storageKey"
              >
                <template v-if="index == 0">
                  <th
                    v-for="(product, productKey) in storage.products"
                    :key="product.product_id"
                    scope="col"
                    class="min-w-[84px] h-[56px] flex flex-col items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
                  >
                    <p class="text-8-reg text-white">
                      {{ product.product_name }}
                    </p>
                  </th>
                </template>
              </template>
            </tr>
          </thead>
          <tbody
            ref="tableRef"
            class="w-fit bg-gray-15-color rounded-b-lg flex flex-col pb-2"
          >
            <template
              v-for="([storageKey, storage], index) in Object.entries(
                warehouseStore.storagesLeft || {}
              )"
              :key="storageKey"
            >
              <tr
                class="w-full h-7 flex"
                :class="[
                  { 'bg-gray-15-color': index % 2 == 1 },
                  {
                    'rounded-b-lg':
                      index ===
                      Object.keys(warehouseStore.storagesLeft).length - 1,
                  },
                ]"
              >
                <th
                  scope="row"
                  class="min-w-[105px] h-full flex items-center justify-start pl-2 border-r border-gray-15-color"
                >
                  <p class="text-10-reg text-white">{{ storage.name }}</p>
                </th>
                <th
                  scope="row"
                  class="min-w-[84px] h-full flex items-center justify-center relative"
                  :class="[
                    index - 1 !== Object.values(storage.products).length
                      ? 'border-r border-gray-15-color'
                      : '',
                  ]"
                  v-for="(product, productKey, index) in storage.products"
                  @mouseenter="
                    {
                      handleActiveWareHouseHover(
                        product.product_id,
                        product.product_name,
                        storage.name
                      );
                      checkPosition();
                    }
                  "
                  @mouseleave="
                    {
                      handleActiveWareHouseHover(null, '', '');
                      cityModalRightDistance = null;
                      cityModalBottomDistance = null;
                    }
                  "
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
                    class="absolute z-[30] w-[190px] h-auto rounded-md bg-dark-gunmental-color border border-gray-15-color p-3 flex flex-col items-start justify-center"
                    ref="productRef"
                    v-if="
                      product.product_id == activeWarehouseHoverMenuId &&
                      product.product_name == activeWarehouseHoverMenuProduct &&
                      storage.name == activeWarehouseHoverMenuCity
                    "
                    :class="[
                      cityModalRightDistance && cityModalRightDistance < 100
                        ? 'left-[-100%] translate-x-[-50%]'
                        : 'left-[-10%]',
                      cityModalBottomDistance && cityModalBottomDistance < 35
                        ? 'bottom-[100%] translate-y-[-10%]'
                        : 'top-[100%] translate-y-[10%]',
                    ]"
                  >
                    <h4 class="w-full text-12-reg text-gray-90-color text-left">
                      {{ activeWarehouseHoverMenuCity }}
                      <span class="text-10-ext text-primary-color">
                        {{ activeWarehouseHoverMenuProduct }}
                      </span>
                    </h4>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-gray-75-color">Остаток</span>
                      <span class="text-8-reg text-gray-90-color">
                        {{
                          Number(product.left.toFixed(1)).toLocaleString(
                            "ru-RU"
                          )
                        }}
                        кг
                      </span>
                    </p>
                    <div
                      class="w-full h-[1px] inline-flex bg-dark-charcoal-color my-1"
                    ></div>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-error-500"
                        >Минимальный запас</span
                      >
                      <span class="text-8-reg text-gray-90-color">
                        {{
                          Number(product.min_limit.toFixed(1)).toLocaleString(
                            "ru-RU"
                          )
                        }}
                        кг
                      </span>
                    </p>
                    <p class="w-full flex items-center justify-between mt-2">
                      <span class="text-8-ext text-success-500"
                        >Максимальный запас</span
                      >
                      <span class="text-8-reg text-gray-90-color">
                        {{
                          Number(product.max_limit.toFixed(1)).toLocaleString(
                            "ru-RU"
                          )
                        }}
                        кг
                      </span>
                    </p>
                  </div>
                </th>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div
        class="w-full z-[40] flex items-center justify-center py-[40px] text-20-semi text-white"
        v-if="Object.values(warehouseStore.storagesLeft).length <= 0"
      >
        Данных не существует
      </div>
    </div>
    <div
      class="w-full z-[40] flex items-center justify-center py-[40px]"
      v-else
    >
      <span class="loader"></span>
    </div>
  </div>
  <div class="w-full z-[40] flex items-center justify-center py-[40px]" v-else>
    <span class="loader"></span>
  </div>
</template>

<style scoped>
.table-tr {
  scrollbar-color: #6b7280 #2b2f33 !important;
}

.table-tr::-webkit-scrollbar {
  height: 2px !important;
}

.table-tr::-webkit-scrollbar-track {
  background-color: #2b2f33 !important;
  border-radius: 2px !important;
}

.table-tr::-webkit-scrollbar-thumb {
  background-color: #6b7280 !important;
  border-radius: 2px !important;
}
</style>
