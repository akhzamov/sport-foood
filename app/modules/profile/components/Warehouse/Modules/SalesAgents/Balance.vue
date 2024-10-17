<script lang="ts" setup>
import { useWarehouseStore } from "~/modules/profile/stores/warehouse";

const warehouseStore = useWarehouseStore();
</script>

<template>
  <div class="w-full h-max flex flex-col mt-5">
    <span class="w-full h-[2px] rounded bg-gray-15-color flex"></span>
    <h3 class="text-14-semi text-gray-90-color mt-5">
      Остатки у торговых агентах
    </h3>
  </div>
  <div
    class="flex flex-col items-start w-full h-full border border-gray-40-color bg-gray-15-color rounded-lg mt-3"
    v-for="(district, key) in warehouseStore.salesAgentsData"
    :key="district.id"
  >
    <div class="w-full h-[38px] flex items-center justify-between px-3">
      <p class="text-14-semi text-white">{{ key }}</p>
    </div>
    <div class="w-full">
      <div class="w-full z-[40]">
        <table class="w-full text-sm table-fixed">
          <thead class="flex">
            <tr class="w-full flex">
              <th
                scope="col"
                class="flex-grow h-[40px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-x border-gray-15-color"
              >
                <p class="text-12-semi text-white">Торговые Агенты</p>
              </th>
              <th
                scope="col"
                class="w-[160px] h-[40px] flex items-center justify-center px-2 bg-dark-charcoal-color border-b border-r border-gray-15-color"
                v-for="(item, itemKey) in district.districts"
                :key="item.id"
              >
                <p class="text-12-semi text-white">{{ itemKey }}</p>
              </th>
            </tr>
          </thead>
          <tbody
            class="w-full bg-transparent rounded-b-lg overflow-hidden flex flex-col"
          >
            <template
              v-for="(agent, agentKey, aIndex) in district.agents"
              :key="aIndex"
            >
              <tr class="w-full flex">
                <th
                  scope="col"
                  class="flex-grow h-full flex items-center justify-start pl-2 border-b border-r border-dark-charcoal-color"
                >
                  <div
                    class="w-full h-max flex flex-col items-start justify-center px-2 pt-1 pb-4"
                  >
                    <p class="text-12-reg text-gray-90-color">
                      {{ agentKey }}
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
                        <p
                          v-for="(
                            aProduct, aProductKey, aProductIndex
                          ) in agent.balance"
                          :key="aProductIndex"
                          class="w-full h-[10px] flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color"
                        >
                          <span class="text-8-ext">
                            {{ aProductKey }}
                          </span>
                          <span class="text-8-reg">
                            {{ Number(aProduct).toFixed(2) }} гр
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </th>
                <th
                  scope="col"
                  class="w-[160px] h-auto flex items-start justify-center p-1 border-b border-r border-dark-charcoal-color"
                  v-for="(dtBalance, dtBalanceKey) in agent.districtsBalance"
                >
                  <div
                    class="w-full h-max flex flex-col gap-1 bg-dark-charcoal-color rounded p-1"
                  >
                    <p
                      v-for="(
                        dtProduct, dtProductKey, dtProductIndex
                      ) in dtBalance.balance"
                      :key="dtProductIndex"
                      class="w-full h-3 flex items-center justify-between border-b border-dotted border-gray-90-color text-gray-90-color"
                    >
                      <span class="text-8-ext">
                        {{ dtProductKey }}
                      </span>
                      <span class="text-8-reg">
                        {{ dtProduct.toFixed(2) }} гр
                      </span>
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
