<script lang="ts" setup>
import { useAdminStore } from "~/modules/admin/stores/admin";
import { useLogisticStore } from "~/modules/admin/stores/logistic";

const adminStore = useAdminStore();
const logisticStore = useLogisticStore();
const { openEditTab, closeTab } = useTabs();
const { getShipment } = useCrudLogisticResponse();

onMounted(async () => {
  await getShipment(adminStore.openUser ?? 0);
});
</script>

<template>
  <div
    class="w-full h-max bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
    v-if="logisticStore.shipment && logisticStore.shipmentArrPoints"
  >
    <div class="w-full h-max flex items-center justify-end pt-[6px] pb-[12px]">
      <UiButton
        bgColor="bg-gray-15"
        :border="true"
        :icon="false"
        hover="opacity-[0.9]"
        textColor="text-gray-90"
        border-color="border-gray-90"
        text="Редактирование"
        class="w-max"
        type="button"
        @click="
          openEditTab(
            adminStore.openUser ?? 0,
            `logistics-edit-${adminStore.openUser ?? 0}`,
            'Закуп'
          );
          closeTab(`logistics-edit-view-${adminStore.openUser ?? 0}`);
        "
      >
        <template v-slot:icon>
          <IconEdit05 class="text-gray-90" />
        </template>
      </UiButton>
    </div>
    <div class="w-full h-max flex flex-col gap-2">
      <div
        class="w-full h-[26px] flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Поставщик</p>
        <p class="text-16-reg text-gray-90">
          {{ logisticStore.shipment.supplier.name }}
        </p>
      </div>
      <div
        class="w-full h-[26px] flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Водитель</p>
        <p class="text-16-reg text-gray-90">
          {{ logisticStore.shipment.driver.name }}
        </p>
      </div>
      <div
        class="w-full h-[26px] flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Дата выезда</p>
        <p class="text-16-reg text-gray-90">
          {{ logisticStore.shipment.arrived_at }}
        </p>
      </div>
      <div
        class="w-full h-[26px] flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Сумма закупки</p>
        <p class="text-16-reg text-gray-90">
          {{ logisticStore.shipment.amount.toLocaleString("ru-RU") }} руб
        </p>
      </div>
      <div
        class="w-full h-[26px] flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Стоимость поездки</p>
        <p class="text-16-reg text-gray-90">
          {{ logisticStore.shipment.driver_amount.toLocaleString("ru-RU") }} руб
        </p>
      </div>
      <div
        class="w-full h-max pb-2 flex items-start justify-between border-b border-gray-15"
      >
        <p class="text-12-reg text-gray-40">Примечание</p>
        <p class="text-16-reg text-gray-90 max-w-[555px] text-wrap text-right">
          {{ logisticStore.shipment.additional ?? "Пусто" }}
        </p>
      </div>
    </div>
    <div
      class="w-full h-[1px] border-b border-dashed border-gray-15 my-3"
    ></div>
    <div class="flex flex-col">
      <LogisticsEditTable
        v-if="logisticStore.shipmentArrPoints"
        :points="logisticStore.shipmentArrPoints"
        @update:points="logisticStore.shipmentArrPoints = $event"
      />
    </div>
  </div>
  <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped></style>
