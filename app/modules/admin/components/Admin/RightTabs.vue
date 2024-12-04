<script lang="ts" setup>
import { useAdminLogisticsStore } from "../../modules/logistics/stores/adminLogistics";
import { useAdminStore } from "../../stores/admin";

const adminLogisticsStore = useAdminLogisticsStore();
const adminStore = useAdminStore();
const removeTab = (id: string) => {
  const index = adminStore.activeOpenTabs.findIndex((tab) => tab.id === id);
  if (adminStore.activeOpenTabs[index + 1]?.id) {
    adminStore.activeOpenTab = adminStore.activeOpenTabs[index + 1]?.id;
  } else {
    adminStore.activeOpenTab = adminStore.activeOpenTabs[index - 1]?.id;
  }
  if (index !== -1) {
    adminStore.activeOpenTabs.splice(index, 1);
  }
};

onMounted(() => {
  adminStore.activeOpenTab = adminStore.activeOpenTabs[0]?.id;
});
</script>

<template>
  <div
    class="absolute z-[100] top-0 right-0 min-w-[740px] w-[740px] h-[100%] flex flex-col border-l border-gray-15-color p-2 overflow-y-auto pb-[80px] bg-dark-charcoal-color"
  >
    <div class="w-max h-max flex items-center justify-start gap-1">
      <template v-for="(tab, index) in adminStore.activeOpenTabs">
        <div
          v-if="adminStore.activeOpenTabs.length > 0"
          :class="[
            adminStore.activeOpenTab == tab.id
              ? 'bg-dark-gunmental-color'
              : 'bg-dark-eerie-black-color',
          ]"
          @click="adminStore.activeOpenTab = tab.id"
          class="w-max h-[36px] flex items-start gap-9 rounded-t-lg py-1 px-2 cursor-pointer"
        >
          <div class="flex flex-col items-start justify-start">
            <p class="text-12-ext text-gray-40-color">{{ tab.name }}:</p>
            <p class="text-10-reg text-gray-90-color">{{ tab.title }}</p>
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
          `admin-logistics-edit-${data.id}` === adminStore.activeOpenTab &&
          adminStore.activeOpenTabs.length > 0 &&
          adminStore.activeOpenTab !== 'admin-logistics-add'
        "
      />
    </template>
    <template v-for="data in adminStore.employees">
      <EmployeesEdit
        :data="data"
        v-if="
          `admin-employees-edit-${data.id}` === adminStore.activeOpenTab &&
          adminStore.activeOpenTabs.length > 0 &&
          adminStore.activeOpenTab !== 'admin-logistics-add'
        "
      />
    </template>
    <template v-for="data in adminStore.salesAgents">
      <SalesAgentsEdit
        :data="data"
        v-if="
          `admin-salesAgents-edit-${data.id}` === adminStore.activeOpenTab &&
          adminStore.activeOpenTabs.length > 0 &&
          adminStore.activeOpenTab !== 'admin-logistics-add'
        "
      />
    </template>
    <template v-for="data in adminStore.activeOpenTabs">
      <LogisticsAdd
        v-if="
          data.id == 'admin-logistics-add' &&
          adminStore.activeOpenTab == 'admin-logistics-add'
        "
      />
      <EmployeesAdd
        v-if="
          data.id == 'admin-employees-add' &&
          adminStore.activeOpenTab == 'admin-employees-add'
        "
      />
    </template>
  </div>
</template>

<style scoped></style>
