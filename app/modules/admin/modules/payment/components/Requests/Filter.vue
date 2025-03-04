<script lang="ts" setup>
import { usePaymentStore } from "~/modules/admin/stores/payment";
import { getPayments } from "./requests.data";
import { useMainStore } from "~/stores/main";
import { useLocalitiesStore } from "~/modules/admin/stores/localities";

const paymentStore = usePaymentStore();
const localitiesStore = useLocalitiesStore();
const mainStore = useMainStore();
const storesMenuShow = ref(false);
const citiesMenuShow = ref(false);
const statusesMenuShow = ref(false);
const prioritiesMenuShow = ref(false);
const typesMenuShow = ref(false);
const paymentsMenuShow = ref(false);
const buttonDisabled = ref(true);

const closeAlertShow = () => {
  paymentStore.filterShow = false;
};
const checkShowFilter = () => {
  if (
    paymentStore.filteredStores.length > 0 ||
    paymentStore.filteredCities.length > 0 ||
    paymentStore.filteredStatus != "" ||
    paymentStore.filteredPriority != "" ||
    paymentStore.filteredType != "" ||
    paymentStore.filteredPaymentId
  ) {
    buttonDisabled.value = false;
  } else {
    buttonDisabled.value = true;
  }
};
const onSubmit = async () => {
  try {
    console.log(buttonDisabled.value);
    if (!buttonDisabled.value) {
      await getPayments();
      paymentStore.filterShow = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const resetFilter = async () => {
  try {
    paymentStore.filteredStores = [];
    paymentStore.filteredCities = [];
    paymentStore.filteredStatus = "";
    paymentStore.filteredPriority = "";
    paymentStore.filteredType = "";
    paymentStore.filteredPaymentId = null;
    console.log("work");
    await getPayments();
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => ({
    stores: paymentStore.filteredStores,
    cities: paymentStore.filteredCities,
    status: paymentStore.filteredStatus,
    priority: paymentStore.filteredPriority,
    type: paymentStore.filteredType,
    paymentId: paymentStore.filteredPaymentId,
  }),
  (newValue, oldValue) => {
    checkShowFilter();
  },
  { deep: true } // Для отслеживания вложенных изменений
);
</script>

<template>
  <div
    class="alert-modal fixed z-[300] top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-40 select-none"
    @click="closeAlertShow()"
  >
    <div
      @click.stop
      v-if="
        mainStore.stores &&
        localitiesStore.citiesByArea &&
        paymentStore.statuses &&
        paymentStore.priorities &&
        paymentStore.types &&
        paymentStore.payments
      "
      class="relative w-[760px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-2 flex flex-col items-center justify-center"
    >
      <div class="w-full h-[64px] flex items-center justify-between">
        <div class="flex items-center justify-start gap-2">
          <div
            class="w-[48px] h-[48px] flex items-center justify-center rounded-[50%] bg-gray-15"
          >
            <IconFilters class="text-gray-90" />
          </div>
          <p class="text-24-semi text-white">Фильтры</p>
        </div>
        <div
          class="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
        >
          <IconClose class="text-gray-75" @click="closeAlertShow()" />
        </div>
      </div>
      <div class="w-full h-max">
        <div class="w-full flex items-center justify-between p-4">
          <div class="max-w-[345px] w-full">
            <UiMultipleSelect
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="mainStore.stores ?? []"
              :show-menu="storesMenuShow"
              default-select-text="Магазины"
              v-model:model-value="paymentStore.filteredStores"
              value-key="id"
              label-key="name"
              @update:show-menu="storesMenuShow = $event"
              :text-center="false"
              :disable="false"
              class="w-full z-[70]"
            />
          </div>
          <div class="max-w-[345px] w-full">
            <UiMultipleSelectCategories
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="localitiesStore.citiesByArea ?? []"
              :show-menu="citiesMenuShow"
              default-select-text="Города"
              v-model:model-value="paymentStore.filteredCities"
              value-key="id"
              label-key="name"
              inner-item-key="cities"
              @update:show-menu="citiesMenuShow = $event"
              :text-center="false"
              :disable="false"
              class="w-full z-[70]"
            />
          </div>
        </div>
        <div class="w-full flex items-center justify-between p-4">
          <div class="max-w-[345px] w-full">
            <UiSelect
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="paymentStore.statuses ?? []"
              :show-menu="statusesMenuShow"
              default-select-text="Статус"
              v-model:model-value="paymentStore.filteredStatus"
              :icon="false"
              value-key="key"
              label-key="value"
              @update:show-menu="statusesMenuShow = $event"
              width="w-full"
              :text-center="false"
              :disable="false"
              class="h-[40px] z-[60]"
            />
          </div>
          <div class="max-w-[345px] w-full">
            <UiSelect
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="paymentStore.priorities ?? []"
              :show-menu="prioritiesMenuShow"
              default-select-text="Приоритет"
              v-model:model-value="paymentStore.filteredPriority"
              :icon="false"
              value-key="key"
              label-key="value"
              @update:show-menu="prioritiesMenuShow = $event"
              width="w-full"
              :text-center="false"
              :disable="false"
              class="h-[40px] z-[60]"
            />
          </div>
        </div>
        <div class="w-full flex items-center justify-between p-4">
          <div class="max-w-[345px] w-full">
            <UiSelect
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="paymentStore.types ?? []"
              :show-menu="typesMenuShow"
              default-select-text="Типы заявок"
              v-model:model-value="paymentStore.filteredType"
              :icon="false"
              value-key="key"
              label-key="value"
              @update:show-menu="typesMenuShow = $event"
              width="w-full"
              :text-center="false"
              :disable="false"
              class="h-[40px] z-[50]"
            />
          </div>
          <div class="max-w-[345px] w-full">
            <UiSelect
              main-text-color="text-gray-90"
              select-bg-color="bg-gray-15"
              disable-text-color="text-gray-40"
              disable-bg-color="bg-gray-15"
              :array="paymentStore.payments ?? []"
              :show-menu="paymentsMenuShow"
              default-select-text="ID заявки"
              v-model:model-value="paymentStore.filteredPaymentId"
              :icon="false"
              value-key="id"
              label-key="id"
              @update:show-menu="paymentsMenuShow = $event"
              width="w-full"
              :text-center="false"
              :disable="false"
              class="h-[40px] z-[50]"
            />
          </div>
        </div>
        <div class="w-full flex items-center justify-end gap-3 p-4">
          <UiButton
            bgColor="bg-transparent"
            :border="false"
            :icon="false"
            hover="opacity-[0.9]"
            textColor="text-gray-75"
            text="Сбросить"
            class="max-w-[140px]"
            @click="resetFilter"
          >
            <template v-slot:icon>
              <IconRefreshCw05 class="w-[24px] h-[24px] text-gray-75" />
            </template>
          </UiButton>
          <UiButton
            :bgColor="buttonDisabled ? 'bg-gray-15' : 'bg-primary'"
            :border="false"
            :icon="false"
            hover="opacity-[0.9]"
            :textColor="buttonDisabled ? 'text-dark-onix' : 'text-dark-night'"
            text="Применить"
            class="max-w-[115px]"
            @click="onSubmit"
          />
        </div>
      </div>
    </div>
    <div
      v-else
      class="relative w-[760px] h-max bg-dark-gunmental rounded-xl border-[1px] border-gray-15 p-2 flex flex-col items-center justify-center"
    >
      <div class="loader"></div>
    </div>
  </div>
</template>

<style></style>
