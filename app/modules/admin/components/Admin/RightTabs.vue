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
const modules = [Navigation];
const swiperRef = ref<any>(null);
const isBeginning = ref(true);
const isEnd = ref(false);

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

const slidePrev = () => {
  if (swiperRef.value) {
    swiperRef.value.swiper.slidePrev();
    isBeginning.value = swiperRef.value.swiper.isBeginning;
    isEnd.value = swiperRef.value.swiper.isEnd;
  }
};

const slideNext = () => {
  if (swiperRef.value) {
    swiperRef.value.swiper.slideNext();
    isBeginning.value = swiperRef.value.swiper.isBeginning;
    isEnd.value = swiperRef.value.swiper.isEnd;
  }
};

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

// watch(
//   () => swiperRef.value.swiper.isBeginning,
//   () => {
//     if (swiperRef.value) {
//       isBeginning.value = swiperRef.value.swiper.isBeginning;
//     }
//   },
//   { deep: true }
// );

// watch(
//   () => swiperRef.value.swiper.isEnd,
//   () => {
//     if (swiperRef.value) {
//       isEnds.value = swiperRef.value.swiper.isEnd;
//     }
//   },
//   { deep: true }
// );
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
    <div v-else class="relative w-full">
      <button
        @click="slidePrev"
        class="custom-swiper-button-prev"
        :class="{ 'button-disabled': isBeginning }"
      >
        <span><IconChevronLeft class="text-gray-40" /></span>
      </button>
      <swiper-container
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :modules="modules"
        :slidesPerView="5"
        :slides-per-group="1"
        class="swiper"
        ref="swiperRef"
      >
        <swiper-slide
          v-for="(tab, index) in adminStore.activeOpenTabs"
          :key="tab.id"
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
      </swiper-container>
      <button
        @click="slideNext"
        class="custom-swiper-button-next"
        :class="{ 'button-disabled': isEnd }"
      >
        <span>
          <IconChevronRight class="text-gray-40" />
        </span>
      </button>
    </div>
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

.custom-swiper-button-prev,
.custom-swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
}

.custom-swiper-button-prev {
  justify-content: start;
  background: linear-gradient(90deg, #3b424a 30.25%, rgba(59, 66, 74, 0) 100%);
  padding-left: 5px;
}

.custom-swiper-button-next {
  justify-content: end;
  background: linear-gradient(270deg, #3b424a 30.25%, rgba(59, 66, 74, 0) 100%);
  padding-right: 5px;
}

.custom-swiper-button-prev span,
.custom-swiper-button-next span {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-swiper-button-prev {
  left: 0;
}

.custom-swiper-button-next {
  right: 0;
}

.custom-swiper-button-prev.button-disabled,
.custom-swiper-button-next.button-disabled {
  opacity: 0;
  pointer-events: none;
}
</style>
