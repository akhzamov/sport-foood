<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { usePaymentStore } from "~/modules/admin/stores/payment";
import { salesReports } from "./salesReports.data";

const schema = yup.object({
  type: yup.string().required("Выберите тип заявки").nullable(),
  amount: yup.number().required("Введите сумму"),
  selectedCity: yup.number().required("Выберите город").nullable(),
  selectedStore: yup.number().required("Выберите магазин").nullable(),
  priority: yup.string().required("Выберите приоритет").nullable(),
  recipient: yup.string().required("Введите получателя"),
});
interface ISchemaForm {
  type: string;
  amount: number;
  selectedCity: number;
  selectedStore: number;
  priority: string;
  recipient: string;
}
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
});
const { value: type, errorMessage: typeError } = useField<string>("type");

const paymentStore = usePaymentStore();
const cityMenuShow = ref(false);
const typeMenuShow = ref(false);
const storeMenuShow = ref(false);
const priorityMenuStore = ref(false);
const statusMenuStore = ref(false);
const accumulating = ref(false);
const editWindow = ref(false);
const edit = ref(false);
const datepicker = ref<any>(null);
const date = ref<Date>();
const activeReport = ref(1);
const activeCityPackagingIds = reactive<number[]>([]);
const selectStore = ref(false);
const selectedStore = ref<number | null>(null);
const selectProduct = ref(false);
const products = reactive({
  1: {
    id: 1,
    productId: null,
    productMenu: false,
    cities: {
      1: {
        cityId: null,
        cityMenu: false,
        packaging: {
          1: {
            package: null,
            count: null,
            amount: null,
            marketplaceId: null,
            marketplaceMenu: false,
          },
        },
      },
    },
  },
});

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function selectDate(value: boolean) {
  if (value) {
    datepicker.value?.openMenu();
  } else {
    datepicker.value?.clearValue();
  }
}

const activeCityPackage = (id: number) => {
  const index = activeCityPackagingIds.indexOf(id);
  if (index !== -1) {
    activeCityPackagingIds.splice(index, 1);
  } else {
    activeCityPackagingIds.push(id);
  }
};

const onSubmit = handleSubmit(async (values) => {});
</script>

<template>
  <div
    v-if="!editWindow"
    class="w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="w-full h-[30px] flex gap-4 justify-between items-center">
      <div class="w-max h-full flex gap-3 items-center justify-start">
        <p class="text-16-reg text-gray-75-color">Магазин 1</p>
        <div class="w-[1px] h-full block bg-gray-15-color"></div>
        <div class="w-max h-full flex gap-[4px] items-center justify-start">
          <IconCalendar class="text-gray-40-color" />
          <p class="text-12-reg text-gray-40-color">13 Дек 2024</p>
        </div>
      </div>
      <div class="w-max h-max flex gap-3 items-center justify-end">
        <UiButton
          text="Распечатать"
          bg-color="bg-gray-15-color"
          text-color="text-gray-90-color"
          hover="hover:opacity-[0.9]"
          :border="false"
          class="w-[140px] h-[30px]"
        >
          <template v-slot:icon>
            <IconPrint class="w-[20px] h-[20px] text-gray-90-color" />
          </template>
        </UiButton>
        <UiButton
          text="Скачать Excel"
          bg-color="bg-primary-color"
          text-color="text-dark-night-color"
          hover="hover:opacity-[0.9]"
          :border="false"
          class="w-[150px] h-[30px]"
        >
          <template v-slot:icon>
            <IconExcel class="w-[20px] h-[25px] text-dark-night-color" />
          </template>
        </UiButton>
      </div>
    </div>
    <div class="w-full h-[32px] mt-3 flex gap-4 justify-between items-center">
      <div class="w-max h-full flex flex-col items-start justify-center">
        <p class="text-12-ext text-gray-40-color">
          Отчет подготовил(а):
          <span class="text-12-reg text-gray-75-color">Дмитрий Петров</span>
        </p>
        <p class="text-12-ext text-gray-40-color">
          Дата подготовки:
          <span class="text-12-reg text-gray-75-color">
            <b>13 Дек 2024</b> 16:30
          </span>
        </p>
      </div>
      <UiButton
        text="Редактировать отчет"
        bg-color="bg-transparent"
        text-color="text-gray-75-color"
        hover="hover:bg-gray-15-color"
        :border="false"
        class="w-[210px] h-[30px]"
        @click="editWindow = true"
      >
        <template v-slot:icon>
          <IconEdit05 class="w-[20px] h-[20px] text-gray-90-color" />
        </template>
      </UiButton>
    </div>
    <div class="w-full flex flex-col justify-start mt-3">
      <div
        class="w-[95%] h-max flex gap-2 items-start justify-start overflow-hidden overflow-x-auto"
      >
        <div
          v-for="(report, key) in salesReports"
          :key="report.id"
          class="w-max h-[24px] flex items-center justify-center px-3 rounded-t-lg text-gray-90-color text-10-reg cursor-pointer"
          :class="[activeReport == key ? 'bg-gray-15-color' : 'bg-white/5']"
          @click="activeReport = key"
        >
          <p>{{ report.name }}</p>
        </div>
      </div>
      <div
        class="w-full h-max"
        v-for="(report, key) in salesReports"
        :key="report.id"
      >
        <div
          class="w-full h-max bg-white/15 flex flex-col gap-1 rounded-tr-lg rounded-b-lg p-2"
          v-if="activeReport == key"
        >
          <div
            class="w-full h-max flex flex-col rounded-[4px] bg-gray-15-color px-2 py-1"
            v-for="(city, cityKey) in report.cities"
          >
            <div
              class="w-full h-[24px] flex items-center justify-between cursor-pointer"
              @click="activeCityPackage(cityKey)"
            >
              <p class="w-[35%] text-14-reg text-gray-90-color">
                {{ city.name }}
              </p>
              <p class="w-[30%] text-center text-14-ext text-gray-75-color">
                170 567 гр
              </p>
              <div class="w-[30%] flex gap-2 items-center justify-end">
                <p
                  class="text-14-reg text-gray-90-color flex items-center gap-[2px]"
                >
                  9 490 000
                  <span class="text-10-ext text-primary-color uppercase">
                    rub
                  </span>
                </p>
                <IconChevronDown class="text-gray-90-color" />
              </div>
            </div>
            <Transition name="cityPackage">
              <div
                v-if="activeCityPackagingIds.includes(cityKey)"
                class="w-full h-max mt-2 flex flex-col rounded-md overflow-hidden bg-dark-gunmental-color"
              >
                <div class="w-full h-[32px] flex border-b border-gray-25-color">
                  <div
                    class="min-w-[170px] flex-grow h-full flex items-center justify-start pl-2"
                  >
                    <p class="text-12-reg text-gray-40-color">Фасовка</p>
                  </div>
                  <div
                    class="w-[90px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">Количество</p>
                  </div>
                  <div
                    class="w-[100px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">Общий вес</p>
                  </div>
                  <div
                    class="w-[130px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      Торговая площадка
                    </p>
                  </div>
                  <div
                    class="w-[170px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">Сумма</p>
                  </div>
                </div>
                <div
                  class="w-full h-[36px] flex bg-gray-15-color"
                  v-for="(item, key, index) in city.packaging"
                  :class="[
                    Object.values(city.packaging).length !== index - 1
                      ? 'border-b border-gray-15-color'
                      : '',
                  ]"
                >
                  <div
                    class="min-w-[170px] flex-grow h-full flex items-center justify-start pl-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      {{ item.package.toLocaleString() }} гр
                    </p>
                  </div>
                  <div
                    class="w-[90px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      {{ item.count.toLocaleString() }}
                    </p>
                  </div>
                  <div
                    class="w-[100px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      {{ (item.package * item.count).toLocaleString() }} гр
                    </p>
                  </div>
                  <div
                    class="w-[130px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      {{ item.marketplace_id }}
                    </p>
                  </div>
                  <div
                    class="w-[170px] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-12-reg text-gray-40-color">
                      {{ item.amount.toLocaleString() }}
                      <span class="text-10-ext text-primary-color uppercase">
                        rub
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full h-[32px] flex border-b border-gray-25-color">
                  <div
                    class="min-w-[35%] flex-grow h-full flex items-center justify-start pl-2"
                  >
                    <p class="text-14-reg text-gray-75-color">Сумма</p>
                  </div>
                  <div class="w-[30%] h-full flex items-center justify-center">
                    <p class="text-14-reg text-gray-75-color">170 567 гр</p>
                  </div>
                  <div
                    class="w-[30%] h-full flex items-center justify-end pr-2"
                  >
                    <p class="text-14-reg text-gray-75-color">
                      9 490 000
                      <span class="text-10-ext text-primary-color uppercase">
                        rub
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-max flex flex-col items-end mt-3">
      <div class="w-[200px] flex items-center justify-between">
        <p class="text-12-reg text-gray-40-color">Общий вес:</p>
        <p class="text-12-reg text-gray-75-color">
          9 490 000
          <span class="text-10-ext text-primary-color uppercase">rub</span>
        </p>
      </div>
      <div
        class="w-[200px] my-2 block border-b border-dashed border-gray-40-color"
      ></div>
      <div class="w-[200px] flex items-center justify-between">
        <p class="text-12-reg text-gray-40-color">Сумма продаж:</p>
        <p class="text-12-reg text-gray-75-color">
          9 490 000
          <span class="text-10-ext text-primary-color uppercase">rub</span>
        </p>
      </div>
      <div
        class="w-[200px] my-2 block border-b border-dashed border-gray-40-color"
      ></div>
      <div class="w-[200px] flex items-center justify-between">
        <p class="text-12-reg text-gray-40-color">Себестоимость:</p>
        <p class="text-12-reg text-gray-75-color">
          9 490 000
          <span class="text-10-ext text-primary-color uppercase">rub</span>
        </p>
      </div>
    </div>
  </div>
  <form
    @submit.prevent="onSubmit"
    v-if="paymentStore.stores && editWindow"
    class="w-full h-max bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <!-- top lvl - 1 : menu and edit toggle-->
    <div class="w-full h-[36px] flex items-center justify-between">
      <div class="w-max h-full flex items-center justify-start gap-3">
        <UiSelect
          main-text-color="text-gray-75-color"
          select-bg-color="bg-gray-15-color"
          disable-text-color="text-gray-40-color"
          disable-bg-color="bg-gray-15-color"
          :array="paymentStore.stores"
          :show-menu="selectStore"
          default-select-text="Магазин"
          v-model:model-value="selectedStore"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:show-menu="selectStore = $event"
          width="w-[140px]"
          :text-center="false"
          :disable="!edit"
          class="h-full z-[300]"
        />
        <div class="w-full h-full flex flex-col">
          <div
            class="w-full h-[38px] flex items-center justify-start gap-2 rounded-md py-1 px-4 bg-gray-15-color"
            @click="selectDate(edit ? true : false)"
            :class="[
              edit
                ? 'text-gray-90-color cursor-pointer'
                : 'text-gray-40-color cursor-not-allowed',
            ]"
          >
            <IconCalendar />
            <span class="text-14-reg text-left">{{
              date ? `${formatDate(date)}` : "Дата"
            }}</span>
          </div>
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
      <div class="w-max h-full flex items-start justify-end">
        <div
          class="w-max h-[28px] flex items-center gap-3 px-2 bg-white/5 rounded-lg"
        >
          <p class="text-12-reg text-gray-75-color">Редактирование</p>
          <UiToggle v-model:model-value="edit" class="w-[36px]" />
        </div>
      </div>
    </div>
    <!-- lvl - 2 : select product -->
    <div class="w-full mt-3 border border-gray-15-color rounded-lg p-3">
      <div
        class="w-full flex flex-col items-start"
        v-for="(product, key) in products"
        :key="product.id"
      >
        <p class="text-12-reg text-gray-90-color">Товар {{ key }}</p>
        <div class="w-full flex items-center justify-between mt-1">
          <UiSelect
            main-text-color="text-gray-75-color"
            select-bg-color="bg-gray-15-color"
            disable-text-color="text-gray-40-color"
            disable-bg-color="bg-gray-15-color"
            :array="paymentStore.stores"
            :show-menu="product.productMenu"
            default-select-text="Товар"
            v-model:model-value="product.productId"
            :icon="false"
            value-key="id"
            label-key="name"
            @update:show-menu="product.productMenu = $event"
            width="w-[200px]"
            :text-center="false"
            :disable="!edit"
            class="h-[40px] z-[290]"
          />
          <div
            class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
          >
            <IconClose class="text-gray-40-color" />
          </div>
        </div>
        <div
          class="w-full block border-dashed border-b border-gray-15-color my-2"
        ></div>
        <!-- lvl - 3 : select city -->
        <div
          class="w-full flex flex-col items-start border border-gray-15-color rounded-lg p-3"
        >
          <div
            class="w-full flex flex-col"
            v-for="(city, key) in product.cities"
          >
            <p class="text-12-reg text-gray-90-color">Город</p>
            <div class="w-full flex items-center justify-between mt-1">
              <UiSelect
                main-text-color="text-gray-75-color"
                select-bg-color="bg-gray-15-color"
                disable-text-color="text-gray-40-color"
                disable-bg-color="bg-gray-15-color"
                :array="paymentStore.stores"
                :show-menu="city.cityMenu"
                default-select-text="Товар"
                v-model:model-value="city.cityId"
                :icon="false"
                value-key="id"
                label-key="name"
                @update:show-menu="city.cityMenu = $event"
                width="w-[200px]"
                :text-center="false"
                :disable="!edit"
                class="h-[40px]"
              />
              <div
                class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
              >
                <IconClose class="text-gray-40-color" />
              </div>
            </div>
            <div
              class="w-full block border-dashed border-b border-gray-15-color my-2"
            ></div>
            <!-- lvl - 4 : packages -->
            <div
              class="w-full h-max flex items-start bg-white/5 rounded-lg p-2"
              v-for="(pack, key) in city.packaging"
            >
              <div class="w-[124px] flex flex-col items-start">
                <p class="text-12-reg text-gray-90-color">Фасовка</p>
                <UiInput
                  v-model:model-value="pack.package"
                  placeholder="В граммах"
                  type="text"
                  class="w-[124px] h-[40px] mt-1"
                />
              </div>
              <div class="w-[116px] flex flex-col items-start ml-1">
                <p class="text-12-reg text-gray-90-color">Количество</p>
                <UiInput
                  v-model:model-value="pack.count"
                  placeholder="В штуках"
                  type="text"
                  class="w-[116px] h-[40px] mt-1"
                />
              </div>
              <div class="w-[167px] flex flex-col items-start ml-1">
                <p class="text-12-reg text-gray-90-color">Сумма</p>
                <UiInput
                  v-model:model-value="pack.amount"
                  placeholder="В рублях"
                  type="text"
                  class="w-[167px] h-[40px] mt-1"
                />
              </div>
              <div class="w-[167px] flex flex-col items-start ml-1">
                <p class="text-12-reg text-gray-90-color">Торговая площадка</p>
                <UiSelect
                  main-text-color="text-gray-75-color"
                  select-bg-color="bg-gray-15-color"
                  disable-text-color="text-gray-40-color"
                  disable-bg-color="bg-gray-15-color"
                  :array="paymentStore.stores"
                  :show-menu="pack.marketplaceMenu"
                  default-select-text="Площадка"
                  v-model:model-value="pack.marketplaceId"
                  :icon="false"
                  value-key="id"
                  label-key="name"
                  @update:show-menu="pack.marketplaceMenu = $event"
                  width="w-[167px]"
                  :text-center="false"
                  :disable="!edit"
                  class="h-[40px] z-[270] mt-1"
                />
              </div>
              <div
                class="w-[1px] h-[58px] block border-r border-gray-15-color mx-2"
              ></div>
              <div
                class="w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
              >
                <IconClose class="text-gray-40-color" />
              </div>
            </div>
            <UiButton
              text="Добавить фасовку"
              bg-color="bg-gray-15-color"
              text-color="text-gray-90-color text-14-reg"
              hover="hover:opacity-[0.9]"
              :border="false"
              :icon="false"
              class="w-[180px] h-[30px] mt-4"
            >
              <template v-slot:icon>
                <IconPlus class="text-gray-90-color" />
              </template>
            </UiButton>
          </div>
        </div>
        <UiButton
          text="Добавить город"
          bg-color="bg-gray-15-color"
          text-color="text-gray-90-color text-14-reg"
          hover="hover:opacity-[0.9]"
          border-color="border-gray-90-color"
          :border="true"
          :icon="false"
          class="w-[180px] h-[30px] mt-4"
        >
          <template v-slot:icon>
            <IconPlus class="text-gray-90-color" />
          </template>
        </UiButton>
      </div>
    </div>
    <UiButton
      text="Добавить товар"
      bg-color="bg-primary-color"
      text-color="text-dark-night-color text-16-reg"
      hover="hover:opacity-[0.9]"
      :border="false"
      :icon="false"
      class="w-[190px] h-[40px] mt-4"
    >
      <template v-slot:icon>
        <IconPlus class="text-dark-night-color" />
      </template>
    </UiButton>
    <div
      class="w-full block border-dashed border-b border-gray-15-color my-2"
    ></div>
    <div class="w-full flex items-center justify-between">
      <UiButton
        text="Удалить"
        bg-color="bg-transparent"
        text-color="text-error-500 text-14-bold"
        hover="hover:opacity-[0.9]"
        :border="false"
        :icon="false"
        class="w-[140px] h-[30px] mt-4 p-0"
      >
        <template v-slot:icon>
          <IconTrash03 class="text-error-500" />
        </template>
      </UiButton>
      <UiButton
        text="Сохранить"
        bg-color="bg-primary-color"
        text-color="text-dark-night-color text-16-reg"
        hover="hover:opacity-[0.9]"
        :border="false"
        :icon="false"
        class="w-[90px] h-[30px] mt-4"
        @click="editWindow = false"
      />
    </div>
  </form>
  <!-- <div
    v-else
    class="sticky z-[20] w-full h-[400px] flex items-center justify-center bg-dark-gunmental-color rounded-tr-md rounded-b-md p-3"
  >
    <div class="loader"></div>
  </div> -->
</template>

<style scoped>
.cityPackage-enter-active {
  transition: all 0.3s linear;
}

.cityPackage-enter-from,
.cityPackage-leave-to {
  opacity: 0;
}
</style>
