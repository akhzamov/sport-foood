<script lang="ts" setup>
import { useAdminLogisticsStore } from "../../modules/logistics/stores/adminLogistics";

const adminLogisticsStore = useAdminLogisticsStore();
const removeTab = (id: string) => {
  const index = adminLogisticsStore.activeOpenTabs.findIndex(
    (tab) => tab.id === id
  );
  if (adminLogisticsStore.activeOpenTabs[index + 1]?.id) {
    adminLogisticsStore.activeOpenTab =
      adminLogisticsStore.activeOpenTabs[index + 1]?.id;
  } else {
    adminLogisticsStore.activeOpenTab =
      adminLogisticsStore.activeOpenTabs[index - 1]?.id;
  }
  if (index !== -1) {
    adminLogisticsStore.activeOpenTabs.splice(index, 1);
  }
};

onMounted(() => {
  adminLogisticsStore.activeOpenTab = adminLogisticsStore.activeOpenTabs[0]?.id;
});
</script>

<template>
  <div
    class="max-w-[740px] w-full h-[100%] flex flex-col border-l border-gray-15-color p-2 overflow-y-auto pb-[80px]"
  >
    <div class="w-max h-max flex items-center justify-start gap-1">
      <template v-for="(tab, index) in adminLogisticsStore.activeOpenTabs">
        <div
          v-if="adminLogisticsStore.activeOpenTabs.length > 0"
          :class="[
            adminLogisticsStore.activeOpenTab == tab.id
              ? 'bg-dark-gunmental-color'
              : 'bg-dark-eerie-black-color',
          ]"
          @click="adminLogisticsStore.activeOpenTab = tab.id"
          class="w-max h-[36px] flex items-start gap-9 rounded-t-lg py-1 px-2 cursor-pointer"
        >
          <div class="flex flex-col items-start justify-start">
            <p class="text-12-ext text-gray-40-color">{{ tab.name }}:</p>
            <p class="text-10-reg text-gray-90-color">{{ tab.id }}</p>
          </div>
          <button
            @click.stop="removeTab(tab.id)"
            class="w-8 h-8 cursor-pointer flex items-start justify-end"
          >
            <IconClose class="text-gray-40-color" />
          </button>
        </div>
      </template>
    </div>
    <template v-for="data in adminLogisticsStore.logisticsData">
      <LogisticsEdit
        :data="data"
        v-if="
          data.id == adminLogisticsStore.activeOpenTab &&
          adminLogisticsStore.activeOpenTabs.length > 0
        "
      />
    </template>
    <LogisticsAdd v-if="adminLogisticsStore.activeOpenTab == 'Новый'" />
  </div>
</template>

<style scoped></style>
