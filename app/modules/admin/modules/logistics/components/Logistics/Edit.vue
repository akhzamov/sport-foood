<script lang="ts" setup>
import { useAdminLogisticsStore } from "../../stores/adminLogistics";
import type { ILogistics } from "../../types/Logistics/logisticsDatat.type";

const props = withDefaults(
  defineProps<{
    data: ILogistics;
  }>(),
  {}
);

const adminLogisticsStore = useAdminLogisticsStore();
const supplierMenu = ref(false);
const currierMenu = ref(false);
const suppliers = reactive([
  { id: 1, name: "OOO Vortex" },
  { id: 2, name: "POWER" },
  { id: 3, name: "Оптовик" },
  { id: 4, name: "YIOIS" },
  { id: 5, name: "Держава" },
  { id: 6, name: "iSport" },
]);
const curriers = reactive([
  { id: 1, name: "Иван Иванов" },
  { id: 2, name: "Максим Семяков" },
  { id: 3, name: "Александр Уролов" },
  { id: 4, name: "Гурам Ягофаров" },
  { id: 5, name: "Дмитрий Артемиков" },
  { id: 6, name: "Евгений Тимуров" },
]);
const supplier = ref<number | null>(null);
const currier = ref<number | null>(null);
const date = ref<any>(null);
const formattedDate = ref("");
const datepicker = ref<any>(null);
const checkPeriod = ref(false);
const purchaseAmount = ref<null | number>(null);
const tripCost = ref<null | number>(null);
const comment = ref("");
const photos = ref<any>(null);
const allTableDataChecked = ref(false);
const tableData = ref<any>(null);
const handleCheckPeriod = () => {
  checkPeriod.value = !checkPeriod.value;
  if (checkPeriod.value) {
    datepicker.value?.openMenu();
  } else {
    datepicker.value?.clearValue();
  }
};
const formatDate = (dateString: string) => {
  const nDate = new Date(dateString);
  let day = nDate.getDate() > 9 ? nDate.getDate() : `0${nDate.getDate()}`;
  let month = nDate.getMonth() > 9 ? nDate.getMonth() : `0${nDate.getMonth()}`;
  let year = nDate.getFullYear();
  return `${day}-${month}-${year}`;
};

watch(
  () => date.value,
  () => {
    if (date.value) {
      formattedDate.value = formatDate(date.value);
    }
  }
);

onMounted(() => {
  const firstProductKey = Object.keys(props.data.products)[0]?.toString() || "";
  if (firstProductKey) {
    adminLogisticsStore.activeOpenEditTableTab = firstProductKey;
  }

  suppliers.find((item) => {
    if (item.name == props.data.supplier) {
      supplier.value = item.id;
    }
  });
  curriers.find((item) => {
    if (item.name == props.data.driver) {
      currier.value = item.id;
    }
  });
  date.value = props.data.departureDate;
  purchaseAmount.value = props.data.orderCost;
  tripCost.value = props.data.tripCost;
  comment.value = props.data.comment;
  photos.value = props.data.images;
  tableData.value = props.data.products;
});
</script>

<template>
  <div
    class="w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Поставщик</label>
        <div class="flex gap-1">
          <UiSelect
            v-model="supplier"
            default-select-text="Выбор поставщика"
            :show-menu="supplierMenu"
            :array="suppliers"
            select-bg-color="bg-gray-15-color"
            main-text-color="text-gray-90-color"
            class="flex-grow"
            @update:show-menu="supplierMenu = $event"
          />
          <button
            class="w-[40px] h-[40px] bg-gray-15-color rounded-lg flex items-center justify-center cursor-pointer"
          >
            <IconEdit05 class="text-gray-90-color" />
          </button>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Доставщик</label>
        <div class="flex gap-1">
          <UiSelect
            v-model="currier"
            default-select-text="Выбор доставщика"
            :show-menu="currierMenu"
            :array="curriers"
            select-bg-color="bg-gray-15-color"
            main-text-color="text-gray-90-color"
            class="flex-grow"
            @update:show-menu="currierMenu = $event"
          />
          <button
            class="w-[40px] h-[40px] bg-gray-15-color rounded-lg flex items-center justify-center cursor-pointer"
          >
            <IconEdit05 class="text-gray-90-color" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-[50%] flex items-center justify-start mt-3 pr-[7px]">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Дата выезда</label>
        <UiInput
          v-model:model-value="formattedDate"
          placeholder="дд-мм-гггг"
          type="string"
          @mousedown="handleCheckPeriod"
          class="w-full"
        />
        <DatePicker
          v-model="date"
          ref="datepicker"
          cancelText="Отмена"
          selectText="Сохранить"
          locale="ru"
          :dark="true"
        />
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Сумма закупки
        </label>
        <UiInput
          v-model:model-value="purchaseAmount"
          placeholder="Сумма в рублях"
          type="number"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">
          Стоимость поездки
        </label>
        <UiInput
          v-model:model-value="tripCost"
          placeholder="Сумма в рублях"
          type="number"
        />
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 mt-3">
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1">Примечание</label>
        <UiTextarea
          v-model:model-value="comment"
          placeholder="Текст"
          class="w-full h-[70px]"
        />
      </div>
      <div class="w-full flex flex-col">
        <label class="text-12-reg text-gray-90-color mb-1"
          >Прикрепить фото</label
        >
        <UiSelectPhoto v-model:model-value="photos" :length="4" />
      </div>
    </div>
    <div
      class="w-full h-[1px] border-b border-dashed border-gray-15-color my-3"
    ></div>
    <div class="w-full h-max border border-gray-15-color rounded-md">
      <div class="w-full h-[40px] flex items-center justify-between px-4">
        <p class="text-16-reg text-gray-40-color">Город доставки</p>
        <div class="w-max h-full flex items-center justify-center gap-2">
          <div
            class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40-color hover:text-primary-color"
          >
            <IconPlus />
          </div>
          <div
            class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40-color hover:text-primary-color"
          >
            <IconEdit05 />
          </div>
          <div
            class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40-color hover:text-error-500"
          >
            <IconTrash03 />
          </div>
        </div>
      </div>
      <!-- Table -->
      <div
        class="w-full h-max flex flex-col justify-start items-center bg-gray-15-color p-2"
      >
        <!-- Table Tabs -->
        <div class="w-full h-[30px] flex items-center justify-start gap-2">
          <template v-for="(city, cityKey) in tableData">
            <div
              @click="
                adminLogisticsStore.activeOpenEditTableTab = cityKey.toString()
              "
              :class="[
                adminLogisticsStore.activeOpenEditTableTab == cityKey.toString()
                  ? 'bg-gray-25-color'
                  : 'bg-gray-15-color',
              ]"
              class="w-max h-full flex items-center justify-center cursor-pointer px-3 rounded-tl-lg rounded-tr-lg"
            >
              <p class="text-14-reg text-gray-90-color">{{ cityKey }}</p>
            </div>
          </template>
        </div>
        <div class="w-full h-max flex flex-col">
          <!-- Table top -->
          <div
            class="w-full h-[35px] flex items-center justify-between rounded-tr-lg bg-gray-25-color px-3"
          >
            <p
              class="text-14-semi text-gray-40-color cursor-pointer hover:text-primary-color"
            >
              Выбрать все
            </p>
            <div class="w-max h-max flex items-center justify-center gap-2">
              <div
                class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40-color hover:text-primary-color"
              >
                <IconPlus />
              </div>
              <div
                class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer text-gray-40-color hover:text-error-500"
              >
                <IconTrash03 />
              </div>
            </div>
          </div>
          <!-- Table data -->
          <table class="w-full h-max bg-gray-15-color">
            <thead class="w-full h-max">
              <tr
                class="w-full h-8 flex bg-gray-40-color border-b border-gray-15-color"
              >
                <th class="w-9 h-full">
                  <div class="w-full h-full flex items-center justify-center">
                    <UiCheckbox v-model:model-value="allTableDataChecked" />
                  </div>
                </th>
                <th class="w-[14px] h-full flex items-center justify-center">
                  <span class="text-12-med text-gray-75-color">№</span>
                </th>
                <th
                  class="w-[224px] h-full flex items-center justify-start px-3"
                >
                  <span class="text-12-med text-gray-75-color">Товар</span>
                </th>
                <th
                  class="w-[160px] h-full flex items-center justify-start px-3"
                >
                  <span class="text-12-med text-gray-75-color">Вес</span>
                </th>
                <th
                  class="w-[124px] h-full flex items-center justify-start px-3"
                >
                  <span class="text-12-med text-gray-75-color">Количество</span>
                </th>
                <th class="w-[120px] h-full flex items-center justify-end px-3">
                  <span class="text-12-med text-gray-75-color">Цена за кг</span>
                </th>
              </tr>
            </thead>
            <tbody class="w-full h-max">
              <template
                v-for="(item, index) in props.data.products[
                  adminLogisticsStore.activeOpenEditTableTab
                ]"
                :key="index"
              >
                <tr class="w-full h-8 flex border-b border-gray-15-color">
                  <th class="w-9 h-full">
                    <div class="w-full h-full flex items-center justify-center">
                      <UiCheckbox v-model:model-value="item.checked" />
                    </div>
                  </th>
                  <th class="w-[14px] h-full flex items-center justify-center">
                    <span class="text-12-med text-gray-75-color">
                      {{ index }}
                    </span>
                  </th>
                  <th
                    class="w-[224px] h-full flex items-center justify-start px-3"
                  >
                    <span class="text-12-med text-gray-75-color">
                      {{ item.name }}
                    </span>
                  </th>
                  <th
                    class="w-[160px] h-full flex items-center justify-start px-3"
                  >
                    <span class="text-12-med text-gray-75-color">
                      {{ item.weight.toLocaleString() }} гр
                    </span>
                  </th>
                  <th
                    class="w-[124px] h-full flex items-center justify-start px-3"
                  >
                    <span class="text-12-med text-gray-75-color">
                      {{ item.count }} шт
                    </span>
                  </th>
                  <th
                    class="w-[120px] h-full flex items-center justify-end px-3"
                  >
                    <span class="text-12-med text-gray-75-color">
                      {{ item.price.toLocaleString() }} руб
                    </span>
                  </th>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
