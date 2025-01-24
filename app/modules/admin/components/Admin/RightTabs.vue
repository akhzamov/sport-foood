<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { usePersonalStore } from "../../stores/personal";
import { usePaymentStore } from "../../stores/payment";
import { useAdminLogisticsStore } from "~/modules/admin/modules/logistic/stores/adminLogistics";
import LogisticsEdit from "~/modules/admin/modules/logistic/components/Logistics/Edit.vue";
import LogisticsAdd from "~/modules/admin/modules/logistic/components/Logistics/Add.vue";
import EmployeesEdit from "~/modules/admin/modules/personal/components/Employees/Edit.vue";
import EmployeesAdd from "~/modules/admin/modules/personal/components/Employees/Add.vue";
import SalesAgentsEdit from "~/modules/admin/modules/personal/components/SalesAgents/Edit.vue";
import SalesAgentsAdd from "~/modules/admin/modules/personal/components/SalesAgents/Add.vue";
import DriversAdd from "~/modules/admin/modules/personal/components/Drivers/Add.vue";
import DriversEdit from "~/modules/admin/modules/personal/components/Drivers/Edit.vue";
import PaymentRequestsAdd from "~/modules/admin/modules/payment/components/Requests/Add.vue";
import PaymentRequestsEdit from "~/modules/admin/modules/payment/components/Requests/Edit.vue";
import SalesReportsEdit from "~/modules/admin/modules/salesReports/components/SalesReports/Edit.vue";
import SettingCitiesAdd from "~/modules/admin/modules/settings/components/Settings/Cities/Add.vue";
import SettingCitiesEdit from "~/modules/admin/modules/settings/components/Settings/Cities/Edit.vue";
import SettingDistrictsAdd from "~/modules/admin/modules/settings/components/Settings/Districts/Add.vue";
import SettingDistrictsEdit from "~/modules/admin/modules/settings/components/Settings/Districts/Edit.vue";

import { cities } from "../../modules/settings/components/Settings/Cities/cities.data";

const adminLogisticsStore = useAdminLogisticsStore();
const adminStore = useAdminStore();
const personalStore = usePersonalStore();
const paymentStore = usePaymentStore();
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

const openTab = (id: string) => {
  // Извлекаем числовую часть в конце строки
  const match = id.match(/\d+$/); // Ищем число в конце строки
  const numId = match ? Number(match[0]) : null;

  if (numId !== null) {
    adminStore.openUser = numId;
    console.log(numId);
  } else {
    adminStore.openUser = null;
    console.warn("Не удалось извлечь числовую часть из строки:", id);
  }
  adminStore.activeOpenTab = id;
};

const dynamicTabs = computed(() => [
  ...(adminLogisticsStore.logisticsData?.map((data: any) => ({
    component: LogisticsEdit,
    data,
    tabId: `admin-logistics-edit-${data.id}`,
  })) ?? []),
  ...(personalStore.employees?.map((data) => ({
    component: EmployeesEdit,
    data,
    tabId: `admin-employees-edit-${data.id}`,
  })) ?? []),
  ...Object.values(personalStore.salesAgents ?? {}).map((data) => ({
    component: SalesAgentsEdit,
    data,
    tabId: `admin-salesAgents-edit-${data.id}`,
  })),
  ...Object.values(personalStore.drivers ?? {}).map((data) => ({
    component: DriversEdit,
    data,
    tabId: `admin-drivers-edit-${data.id}`,
  })),
  ...Object.values(paymentStore.payments ?? {}).map((data) => ({
    component: PaymentRequestsEdit,
    data,
    tabId: `admin-payment-requests-edit-${data.id}`,
  })),
  ...Object.values(paymentStore.payments ?? {}).map((data) => ({
    component: SalesReportsEdit,
    data,
    tabId: `admin-sales-reports-edit-${data.id}`,
  })),
  ...Object.values(cities ?? {}).map((data) => ({
    component: SettingCitiesEdit,
    data,
    tabId: `admin-setting-city-edit-${data.id}`,
  })),
  ...Object.values(cities ?? {}).map((data) => ({
    component: SettingDistrictsEdit,
    data,
    tabId: `admin-setting-district-edit-${data.id}`,
  })),
  {
    component: LogisticsAdd,
    data: null,
    tabId: "admin-logistics-add",
  },
  {
    component: EmployeesAdd,
    data: null,
    tabId: "admin-employees-add",
  },
  {
    component: SalesAgentsAdd,
    data: null,
    tabId: "admin-salesAgents-add",
  },
  {
    component: DriversAdd,
    data: null,
    tabId: "admin-drivers-add",
  },
  {
    component: PaymentRequestsAdd,
    data: null,
    tabId: "admin-payment-requests-add",
  },
  {
    component: SettingCitiesAdd,
    data: null,
    tabId: "admin-setting-city-add",
  },
  {
    component: SettingDistrictsAdd,
    data: null,
    tabId: "admin-setting-district-add",
  },
]);

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
          @click="openTab(tab.id)"
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
    <template v-for="(item, index) in dynamicTabs">
      <component
        :is="item.component"
        :data="item.data"
        v-if="
          item.tabId === adminStore.activeOpenTab &&
          adminStore.activeOpenTabs.length > 0
        "
      />
    </template>
  </div>
</template>

<style scoped></style>
