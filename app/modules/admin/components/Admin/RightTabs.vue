<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useAdminStore } from "~/modules/admin/stores/admin";
import { Navigation } from "swiper/modules";

// Import all components
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
import SettingProductsAdd from "~/modules/admin/modules/settings/components/Settings/Products/Add.vue";
import SettingProductsEdit from "~/modules/admin/modules/settings/components/Settings/Products/Edit.vue";
import SettingStoresAdd from "~/modules/admin/modules/settings/components/Settings/Stores/Add.vue";
import SettingStoresEdit from "~/modules/admin/modules/settings/components/Settings/Stores/Edit.vue";

const adminStore = useAdminStore();
const containerRef = ref(null);
const modules = [Navigation];

const removeTab = (id: string) => {
  const index = adminStore.activeOpenTabs.findIndex((tab) => tab.id === id);
  if (index !== -1) {
    // Выбираем следующий или предыдущий таб при закрытии
    const nextTab = adminStore.activeOpenTabs[index + 1];
    const prevTab = adminStore.activeOpenTabs[index - 1];

    if (nextTab) {
      adminStore.activeOpenTab = nextTab.id;
      const match = nextTab.title.match(/\d+$/);
      const numId = match ? Number(match[0]) : null;
      if (numId) {
        adminStore.openUser = numId;
      }
    } else if (prevTab) {
      adminStore.activeOpenTab = prevTab.id;
      const match = prevTab.title.match(/\d+$/);
      const numId = match ? Number(match[0]) : null;
      if (numId) {
        adminStore.openUser = numId;
      }
    } else {
      adminStore.activeOpenTab = "";
    }
    // Удаляем таб
    adminStore.activeOpenTabs.splice(index, 1);
  }
};

// Функция открытия таба
const openTab = (id: string) => {
  const match = id.match(/\d+$/);
  adminStore.openUser = match ? Number(match[0]) : null;
  adminStore.activeOpenTab = id;
};

// Словарь компонентов для более надежного маппинга
const componentMap = reactive({
  "logistics-edit": markRaw(LogisticsEdit),
  "logistics-add": markRaw(LogisticsAdd),
  "employees-edit": markRaw(EmployeesEdit),
  "employees-add": markRaw(EmployeesAdd),
  "sales-agents-edit": markRaw(SalesAgentsEdit),
  "sales-agents-add": markRaw(SalesAgentsAdd),
  "drivers-edit": markRaw(DriversEdit),
  "drivers-add": markRaw(DriversAdd),
  "payment-requests-edit": markRaw(PaymentRequestsEdit),
  "payment-requests-add": markRaw(PaymentRequestsAdd),
  "sales-reports-edit": markRaw(SalesReportsEdit),
  "settings-city-edit": markRaw(SettingCitiesEdit),
  "settings-city-add": markRaw(SettingCitiesAdd),
  "settings-district-edit": markRaw(SettingDistrictsEdit),
  "settings-district-add": markRaw(SettingDistrictsAdd),
  "settings-product-edit": markRaw(SettingProductsEdit),
  "settings-product-add": markRaw(SettingProductsAdd),
  "settings-store-edit": markRaw(SettingStoresEdit),
  "settings-store-add": markRaw(SettingStoresAdd),
});

// Улучшенный computed для динамических табов
const dynamicTabs = computed(() => {
  return adminStore.activeOpenTabs
    .map((tab) => {
      const componentKey = tab.id.replace(/-\d+$/, "");
      return {
        component: (componentMap as any)[componentKey] || "",
        tabId: tab.id,
      };
    })
    .filter((tab) => tab.component !== null);
});

onMounted(() => {
  if (adminStore.activeOpenTabs.length > 0) {
    const firstTab = adminStore.activeOpenTabs[0];
    if (firstTab) {
      adminStore.activeOpenTab = firstTab.id;
    }
  }
});

watch(
  () => adminStore.activeOpenTab,
  () => {
    if (adminStore.activeOpenTab) {
      let match = adminStore.activeOpenTab.match(/\d+$/);
      if (!match) {
        adminStore.openUser = null;
      }
    }
  }
);
</script>

<template>
  <div
    class="absolute z-[100] top-0 right-0 min-w-[740px] w-[740px] h-[100%] flex flex-col border-l border-gray-15 p-2 overflow-y-auto pb-[80px] bg-dark-charcoal"
  >
    <div
      v-if="adminStore.activeOpenTabs.length < 6"
      class="w-full h-max flex items-center justify-start gap-1 overflow-x-auto"
    >
      <template v-for="(tab, index) in adminStore.activeOpenTabs" :key="tab.id">
        <div
          :class="[
            adminStore.activeOpenTab == tab.id
              ? 'bg-dark-gunmental'
              : 'bg-dark-eerie-black',
          ]"
          @click="openTab(tab.id)"
          class="w-max h-[36px] flex items-start gap-9 rounded-t-lg py-1 px-2 cursor-pointer"
        >
          <div class="flex flex-col items-start justify-start">
            <p class="text-12-ext text-gray-40">{{ tab.name }}:</p>
            <p class="text-10-reg text-gray-90">{{ tab.title }}</p>
          </div>
          <button
            @click.stop="removeTab(tab.id)"
            class="w-8 h-8 cursor-pointer flex items-start justify-end"
          >
            <IconClose class="text-gray-40" />
          </button>
        </div>
      </template>
    </div>
    <swiper-container
      v-else
      :navigation="true"
      :modules="modules"
      :slidesPerView="5"
      :slides-per-group="1"
      class="swiper"
    >
      <template v-for="(tab, index) in adminStore.activeOpenTabs" :key="tab.id">
        <swiper-slide
          :class="[
            adminStore.activeOpenTab == tab.id
              ? 'bg-dark-gunmental'
              : 'bg-dark-eerie-black',
          ]"
          @click="openTab(tab.id)"
          class="swiper-slide h-[36px] flex items-start gap-9 rounded-t-lg py-1 px-2 cursor-pointer"
        >
          <div class="flex flex-col items-start justify-start">
            <p class="text-12-ext text-gray-40">{{ tab.name }}:</p>
            <p class="text-10-reg text-gray-90">{{ tab.title }}</p>
          </div>
          <button
            @click.stop="removeTab(tab.id)"
            class="w-8 h-8 cursor-pointer flex items-start justify-end"
          >
            <IconClose class="text-gray-40" />
          </button>
        </swiper-slide>
      </template>
    </swiper-container>
    <template v-for="item in dynamicTabs" :key="item.tabId">
      <component
        v-if="item.tabId === adminStore.activeOpenTab"
        :is="item.component"
      />
    </template>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  margin: 0 0;
}

.swiper-slide {
  max-width: 120px;
  width: 100%;
  display: flex;
}
.swiper-button-next,
.swiper-button-prev {
  width: 40px !important;
  height: 40px !important;
  background: #000 !important;
  color: #fff !important;
}
</style>
