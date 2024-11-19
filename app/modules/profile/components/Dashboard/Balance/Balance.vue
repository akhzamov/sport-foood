<script lang="ts" setup>
const router = useRouter();
const activeFilter = ref("platform");
const items = reactive([
  {
    id: 1,
    name: "Ozon",
    weight: 2600,
    totalSum: 9230,
    percent: 24,
  },
  {
    id: 2,
    name: "Worldsport",
    weight: 781400,
    totalSum: 27153000,
    percent: 80,
  },
  {
    id: 3,
    name: "Tenor",
    weight: 457240,
    totalSum: 18234000,
    percent: 57,
  },
  {
    id: 4,
    name: "Coldmans",
    weight: 881400,
    totalSum: 21567000,
    percent: 120,
  },
  {
    id: 5,
    name: "Zeus",
    weight: 457240,
    totalSum: 13654000,
    percent: 50,
  },
  {
    id: 6,
    name: "Yolo",
    weight: 781400,
    totalSum: 16234000,
    percent: 76,
  },
  {
    id: 7,
    name: "Guru",
    weight: 512240,
    totalSum: 27456000,
    percent: 58,
  },
  {
    id: 8,
    name: "Guru",
    weight: 512240,
    totalSum: 27456000,
    percent: 78,
  },
  {
    id: 9,
    name: "Guru",
    weight: 512240,
    totalSum: 27456000,
    percent: 99,
  },
]);

const handleRouterWarehouse = () => {
  router.push("/profile-warehouse");
};
</script>

<template>
  <div class="w-[390px] rounded-lg overflow-hidden">
    <div
      class="h-[40px] flex items-center justify-between bg-dark-gunmental-color pl-5 pr-1"
    >
      <h4 class="text-14-bold text-gray-90-color">Остатки</h4>
      <div
        class="w-max h-max flex items-center p-[2px] rounded-md bg-dark-onix-color"
      >
        <div
          @click="activeFilter = 'platform'"
          :class="[
            activeFilter == 'platform'
              ? 'bg-primary-color text-dark-eerie-black-color'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconIcon34 />
          <p class="text-8-reg">Площадки</p>
        </div>
        <div
          @click="activeFilter = 'agents'"
          :class="[
            activeFilter == 'agents'
              ? 'bg-primary-color text-dark-eerie-black-color'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconUserCheck02 />
          <p class="text-8-reg">Агенты</p>
        </div>
        <div
          @click="activeFilter = 'warehouse'"
          :class="[
            activeFilter == 'warehouse'
              ? 'bg-primary-color text-dark-eerie-black-color'
              : 'bg-transparent text-white',
          ]"
          class="w-[82px] h-[26px] flex flex-col items-center justify-center cursor-pointer rounded-[4px]"
        >
          <IconBuilding07 />
          <p class="text-8-reg">Склад</p>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col w-full h-[360px] bg-dark-gunmental-color"
    >
      <div
        class="w-full h-[20px] flex items-center px-[20px] bg-dark-charcoal-color"
      >
        <p class="flex-grow text-10-reg text-white">Торговые площадки</p>
        <p class="w-[80px] text-10-ext text-gray-75-color text-end">Вес</p>
        <p class="w-[80px] ml-3 text-10-ext text-gray-75-color text-end">
          Сумма
        </p>
      </div>
      <div class="w-full h-full flex flex-col mb-2 overflow-y-auto">
        <template v-for="item in items" :key="item.id">
          <div
            class="relative w-full min-h-[40px] max-h-[40px] h-full flex items-center pr-[20px]"
          >
            <div class="flex-grow flex items-center z-[1]">
              <span class="w-4 h-4 text-center text-12-semi text-gray-40-color">
                {{ item.id }}
              </span>
              <img
                src="/img/ozon.png"
                alt=""
                class="w-6 h-6 rounded-[50%] object-cover ml-1"
              />
              <span class="text-10-semi text-gray-90-color ml-1">{{
                item.name
              }}</span>
            </div>
            <div class="w-[80px] flex items-center justify-end z-[1]">
              <span class="text-10-semi text-gray-75-color">
                {{ item.weight.toLocaleString() }} гр
              </span>
            </div>
            <div class="w-[80px] flex items-center justify-end z-[1]">
              <span class="text-10-semi text-gray-75-color">
                {{ item.totalSum.toLocaleString() }}
              </span>
            </div>
            <div
              :style="{ width: `${item.percent >= 100 ? 100 : item.percent}%` }"
              class="item-gradient w-[24%] h-full absolute z-[0] flex items-center justify-center border-r-2 border-malachite"
            >
              <span class="text-[40px] italic font-bold text-gray-15-color">
                {{ item.percent }}%
              </span>
            </div>
          </div>
        </template>
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
  </div>
</template>

<style scoped>
.item-gradient {
  background: linear-gradient(
    270deg,
    rgba(50, 213, 131, 0.3) 0%,
    rgba(12, 86, 71, 0) 181.58%
  );
}
</style>
