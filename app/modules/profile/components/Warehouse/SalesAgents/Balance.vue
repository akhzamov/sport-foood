<script lang="ts" setup>
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";
import type { TSalesAgentLeftAgentDistrict } from "~/modules/profile/types/Warehouse/salesAgentLeft.type";

const warehouseStore = useWarehouseStore();
const uniqueDistricts = computed(() => {
  const districtsSet = new Set();
  const unique: TSalesAgentLeftAgentDistrict[] = [];

  if (warehouseStore.salesAgentLeft) {
    Object.values(warehouseStore.salesAgentLeft).forEach((city) => {
      if (city.agents) {
        Object.values(city.agents).forEach((agent) => {
          Object.values(agent.districts)?.forEach((district) => {
            if (!districtsSet.has(district.name)) {
              districtsSet.add(district.name);
              unique.push(district);
            }
          });
        });
      }
    });
  }

  return unique;
});
</script>

<template>
  <div class="w-full h-max flex flex-col mt-5">
    <span class="w-full h-[2px] rounded bg-gray-15-color flex"></span>
    <h3 class="text-14-semi text-gray-90-color mt-5">
      Остатки у торговых агентах
    </h3>
  </div>
  <template v-if="warehouseStore.salesAgentLeft != null">
    <div
      class="flex flex-col items-start w-full h-full border border-gray-40-color bg-gray-15-color rounded-lg mt-3"
      v-for="(city, cityKey) in warehouseStore.salesAgentLeft"
      :key="city.id"
    >
      <div class="w-full h-[38px] flex items-center justify-between px-3">
        <p class="text-14-semi text-white">{{ city.name }}</p>
      </div>
      <div class="w-full">
        <div class="w-full z-[40] overflow-x-auto">
          <table class="w-full text-sm table-fixed">
            <thead class="flex">
              <tr class="w-full flex">
                <th
                  scope="col"
                  class="min-w-[160px] max-w-[160px] w-full h-[40px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-x border-gray-15-color"
                >
                  <p class="text-12-semi text-white">Торговые Агенты</p>
                </th>
                <th
                  scope="col"
                  class="flex-grow min-w-[170px] w-full h-[40px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
                  v-for="(district, districtKey) in city.districts"
                >
                  <p class="text-12-semi text-white">{{ district.name }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="w-full bg-transparent rounded-b-lg flex flex-col">
              <tr
                class="w-full flex"
                v-for="(agent, agentKey) in city.agents"
                :key="agent.id"
              >
                <th
                  scope="col"
                  class="min-w-[160px] max-w-[160px] w-full h-max flex items-center justify-start pl-2 border-b border-r border-dark-charcoal-color"
                >
                  <div
                    class="w-full h-max flex flex-col items-start justify-center px-2 pt-1 pb-4"
                  >
                    <p class="text-12-reg text-gray-90-color">
                      {{ agent.name }}
                    </p>
                    <div
                      class="w-full h-max flex flex-col items-start justify-center bg-dark-charcoal-color p-1 rounded mt-1"
                    >
                      <p
                        class="w-full h-4 flex items-center justify-start bg-green-25-color rounded-t-[4px] rounded-b-sm text-8-ext text-gray-90-color px-[2px]"
                      >
                        Остатки на руках
                      </p>
                      <div
                        class="w-full h-max flex flex-col gap-1 bg-gray-15-color rounded-t-sm rounded-b-[2px] p-[2px] mt-1"
                      >
                        <template
                          v-if="Object.keys(agent.hand_left).length > 0"
                        >
                          <p
                            v-for="(handLeft, handLeftKey) in agent.hand_left"
                            :key="handLeft.product_id"
                            class="w-full h-4 flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color p-0"
                          >
                            <template
                              v-for="(value, key) in handLeft"
                              :key="key"
                            >
                              <template v-if="key !== 'product_id'">
                                <span class="text-8-reg"> {{ key }}: </span>
                                <span class="text-8-reg"> {{ value }} гр </span>
                              </template>
                            </template>
                          </p>
                        </template>
                        <p
                          v-else
                          class="w-full h-4 flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color"
                        >
                          <span class="text-8-ext">Пусто</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  class="flex-grow min-w-[170px] w-full h-auto flex items-start justify-center p-1 border-b border-r border-dark-charcoal-color"
                  v-for="(district, districtKey) in agent.districts"
                >
                  <div
                    class="w-full h-max flex flex-col gap-1 bg-dark-charcoal-color rounded p-1"
                  >
                    <template
                      v-if="
                        district.products && !Array.isArray(district.products)
                      "
                    >
                      <p
                        v-for="(product, productKey) in district.products"
                        :key="product.id"
                        class="w-full h-4 flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color p-0"
                      >
                        <template v-for="(value, key) in product" :key="key">
                          <!-- Условие исключает ключи min и max -->
                          <template v-if="key !== 'min' && key !== 'max'">
                            <span class="text-8-reg"> {{ key }}: </span>
                            <span class="text-8-reg"> {{ value }} гр </span>
                          </template>
                        </template>
                      </p>
                    </template>
                    <p
                      v-else
                      class="w-full h-4 flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color"
                    >
                      <span class="text-8-ext">Пусто</span>
                    </p>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  <div
    v-else-if="
      warehouseStore.salesAgentLeft == null && !warehouseStore.isLoading
    "
    class="w-full h-[38px] flex items-center justify-center px-3"
  >
    <p class="text-16-semi text-white text-center">
      Выберите Область/Город для отображения информации
    </p>
  </div>
  <div
    v-else-if="warehouseStore.isLoading"
    class="w-full h-max flex items-center justify-center px-3 py-5"
  >
    <span class="loader"></span>
  </div>
</template>

<style scoped></style>
