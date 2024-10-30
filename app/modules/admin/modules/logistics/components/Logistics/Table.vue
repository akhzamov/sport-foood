<script lang="ts" setup>
import { useMainStore } from "~/stores/main";
import { useAdminLogisticsStore } from "../../stores/adminLogistics";
import { logisticData } from "./logisticsTable.data";

const adminLogisticsStore = useAdminLogisticsStore();
const mainStore = useMainStore();
const route = useRoute();
const data = reactive(logisticData);
const allChecked = ref(false);
const itemIds = reactive<string[]>([]);
const suppliers = reactive<string[]>([]);
const deleteItemTitle = ref("");
const deleteItemText = ref("");
const dateFormatter = (date: string) => {
  let nDate = new Date(date);
  let day = nDate.getDate() > 9 ? nDate.getDate() : `0${nDate.getDate()}`;
  let month = nDate.getMonth() > 9 ? nDate.getMonth() : `0${nDate.getMonth()}`;
  let fullYear = nDate.getFullYear();

  return `${day}.${month}.${fullYear}`;
};
const timeFormatter = (date: string) => {
  let nDate = new Date(date);
  let hour = nDate.getHours() > 9 ? nDate.getHours() : `0${nDate.getHours()}`;
  let minute =
    nDate.getMinutes() > 9 ? nDate.getMinutes() : `0${nDate.getMinutes()}`;

  return `${hour}:${minute}`;
};
const handleAllChecked = () => {
  if (allChecked.value) {
    data.forEach((item) => {
      item.checked = true;
    });
  } else {
    data.forEach((item) => {
      item.checked = false;
    });
  }
};
const deleteItem = () => {
  let idsText = itemIds.length > 1 ? "Удалить закупки: " : "Удалить закупку";
  let splText = suppliers.length > 1 ? "Поставщики: " : "Поставщик";
  deleteItemTitle.value = `${idsText} ${itemIds
    .map((id) => `#${id}`)
    .join(", ")}`;
    deleteItemText.value = `${splText} ${suppliers
    .map((supplier) => `${supplier}`)
    .join(", ")}`;
  console.log(deleteItemText.value);
  mainStore.confirmModal = true;
};

watch(
  () => data,
  () => {
    let length = 0;
    itemIds.length = 0;
    suppliers.length = 0;
    data.forEach((item) => {
      if (item.checked) {
        length += 1;
        itemIds.push(item.id);
        suppliers.push(item.supplier);
      } else if (item.checked && length > 0) {
        length -= 1;
        itemIds.forEach((id, index) => {
          if (id == item.id) {
            itemIds.splice(index, 1);
          }
        });
        suppliers.forEach((supplier, index) => {
          if (supplier == item.supplier) {
            suppliers.splice(index, 1);
          }
        });
      }
    });
    if (length == data.length) {
      allChecked.value = true;
    } else {
      allChecked.value = false;
    }
  },
  { deep: true }
);
</script>

<template>
  <Transition name="alert">
    <UiConfirmModal
      v-if="mainStore.confirmModal"
      type="delete"
      :title="deleteItemTitle"
      :text="deleteItemText"
    />
  </Transition>
  <div
    class="w-full h-[40px] bg-dark-gunmental-color px-2 p-2 overflow-x-hidden"
  >
    <div class="flex-grow h-full flex items-center justify-start">
      <div
        class="min-w-[170px] h-full flex items-center justify-start px-3 py-1 border-r border-gray-15-color"
      >
        <p class="text-16-400 text-gray-40-color">{{ route.name }}</p>
      </div>
      <IconPlus class="text-gray-40-color hover:text-primary-color ml-4" />
      <IconTrash03
        class="text-gray-40-color hover:text-error-500 ml-4"
        @click="deleteItem()"
      />
    </div>
  </div>
  <div class="w-full h-full">
    <table class="w-full">
      <thead class="w-full">
        <tr
          class="w-full h-[32px] flex items-center text-12-med text-gray-40-color border-b border-gray-40-color"
        >
          <th class="w-[22px] text-end">№</th>
          <th class="w-[36px] flex justify-center">
            <UiCheckbox v-model="allChecked" @click="handleAllChecked()" />
          </th>
          <th class="w-[72px] text-center">ID заказа</th>
          <th class="w-[180px] text-left pl-3">Поставщик</th>
          <th class="w-[180px] text-left pl-3">Водитель</th>
          <th
            v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
            class="w-[140px] text-left pl-3"
          >
            Дата выезда
          </th>
          <th
            v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
            class="w-[320px] text-left pl-3"
          >
            Точки доставки
          </th>
          <th
            v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
            class="flex-grow text-left pl-3"
          >
            Статус
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in data">
          <tr
            @click="
              adminLogisticsStore.activeOpenTabs.push({
                id: item.id,
                name: 'ID заказа',
              })
            "
            :class="[
              index - 1 !== data.length ? 'border-b border-gray-40-color' : '',
            ]"
            class="w-full h-[36px] flex items-center cursor-pointer hover:bg-gray-15-color"
          >
            <th class="w-[22px] h-full flex items-center justify-end">
              <span class="text-end text-14-ext text-gray-75-color">
                {{ index + 1 }}
              </span>
            </th>
            <th class="w-[36px] flex items-center justify-center" @click.stop>
              <UiCheckbox v-model="item.checked" />
            </th>
            <th class="w-[72px] flex justify-center">
              <span class="text-center text-12-reg text-gray-75-color">
                {{ item.id }}
              </span>
            </th>
            <th class="w-[180px] flex items-center justify-start">
              <span class="pl-3 text-14-reg text-gray-75-color">
                {{ item.supplier }}
              </span>
            </th>
            <th class="w-[180px] flex items-center justify-start">
              <span class="pl-3 text-14-reg text-gray-75-color">
                {{ item.driver }}
              </span>
            </th>
            <th
              v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
              class="w-[140px] flex items-center justify-start"
            >
              <span class="pl-3 text-14-reg text-gray-75-color">
                {{ dateFormatter(item.departureDate) }}
              </span>
              <span class="ml-1 text-12-reg text-gray-40-color">
                {{ timeFormatter(item.departureDate) }}
              </span>
            </th>
            <th
              v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
              class="min-w-[320px] flex items-center justify-start"
            >
              <div
                class="ml-3 w-[6px] h-[6px] block rounded-[50%] bg-gray-75-color"
              ></div>
              <span class="ml-1 text-14-reg text-gray-75-color">
                {{ item.deliveryPoint }}
              </span>
            </th>
            <th
              v-if="adminLogisticsStore.activeOpenTabs.length <= 0"
              class="flex-grow flex items-center justify-start"
            >
              <p
                v-if="item.status == 'delivered'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-emerald-500/15 flex items-center justify-start gap-1"
              >
                <IconCheck class="w-[12px] h-[12px] text-emerald-500" />
                <span class="text-12-reg text-emerald-500">Доставлен</span>
              </p>
              <p
                v-if="item.status == 'on_the_way'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-yellow-500/15 flex items-center justify-start gap-1"
              >
                <IconTruck02 class="w-[12px] h-[12px] text-yellow-500" />
                <span class="text-12-reg text-yellow-500">В пути</span>
              </p>
              <p
                v-if="item.status == 'not_fully_delivered'"
                class="ml-3 px-2 w-max h-[22px] rounded-[20px] bg-error-500-20 flex items-center justify-start gap-1"
              >
                <IconAlertTriangle class="w-[12px] h-[12px] text-error-500" />
                <span class="text-12-reg text-error-500"
                  >Доставлен не полностью</span
                >
              </p>
            </th>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
